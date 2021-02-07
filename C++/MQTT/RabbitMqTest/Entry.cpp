#include <atomic>
#include <iostream>
#include <cstdlib>
#include <string>
#include <cstring>
#include <cctype>
#include <thread>
#include <chrono>
#include "mqtt/async_client.h"

using namespace std;

const string SERVER_ADDRESS{ "tcp://192.168.1.249:1883" };
const string CLIENT_C_ID{ "async_consumer" };

const string CONSUMER_TOPIC{  };
const string CONSUMER_TOPIC1{ "cmnd" };
const string CONSUMER_TOPIC2{ "tele/innopharmaravescourt/processlab/ThermoTwinscrew/Leadfluid_BT301L_pump/BT301L_pump/aabbccddeeff" };
const string CONSUMER_TOPIC3{ "tele" };
const string CONSUMER_TOPIC4{ "stat/test" };
const string CONSUMER_TOPIC5{ "stat" };

std::vector<std::string>consumers{
	"cmnd/innopharmaravescourt/processlab/ThermoTwinscrew/Leadfluid_BT301L_pump/BT301L_pump/aabbccddeeff", 
	"cmnd",
	"tele/innopharmaravescourt/processlab/ThermoTwinscrew/Leadfluid_BT301L_pump/BT301L_pump/aabbccddeeff", 
	"tele",
	"stat/test", 
	"stat"
};

const string PUBLISHER_TOPIC{ "publish" };
const string PUBLISHER_TOPIC1{ "publish1" };
const string PUBLISHER_TOPIC2{ "publish2" };

std::vector<std::string>publishers{
	"hello",
	"high",
    "so"
};

const string CLIENT_P_ID{ "async_publisher" };
const int  QOS = 1;

const char* PAYLOAD1 = "Hello World!";
const char* PAYLOAD2 = "Hi there!";
const char* PAYLOAD3 = "Is anyone listening?";
const char* PAYLOAD4 = "Someone is always listening.";

const char* LWT_PAYLOAD = "Last will and testament.";


const auto TIMEOUT = std::chrono::seconds(10);
/**
 * A callback class for use with the main MQTT client.
 */
class callback : public virtual mqtt::callback
{
public:
	void connection_lost(const string& cause) override {
		cout << "\nConnection lost" << endl;
		if (!cause.empty())
			cout << "\tcause: " << cause << endl;
	}

	void delivery_complete(mqtt::delivery_token_ptr tok) override {
		cout << "\tDelivery complete for token: "
			<< (tok ? tok->get_message_id() : -1) << endl;
	}
};

/////////////////////////////////////////////////////////////////////////////

/**
 * A base action listener.
 */
class action_listener : public virtual mqtt::iaction_listener
{
protected:
	void on_failure(const mqtt::token& tok) override {
		cout << "\tListener failure for token: "
			<< tok.get_message_id() << endl;
	}

	void on_success(const mqtt::token& tok) override {
		cout << "\tListener success for token: "
			<< tok.get_message_id() << endl;
	}
};

/////////////////////////////////////////////////////////////////////////////

/**
 * A derived action listener for publish events.
 */
class delivery_action_listener : public action_listener
{
	atomic<bool> done_;

	void on_failure(const mqtt::token& tok) override {
		action_listener::on_failure(tok);
		done_ = true;
	}

	void on_success(const mqtt::token& tok) override {
		action_listener::on_success(tok);
		done_ = true;
	}

public:
	delivery_action_listener() : done_(false) {}
	bool is_done() const { return done_; }
};

/////////////////////////////////////////////////////////////////////////////
void subscribe() {
	mqtt::connect_options connOpts;
	connOpts.set_keep_alive_interval(20);
	connOpts.set_clean_session(true);

	mqtt::async_client cli(SERVER_ADDRESS, CLIENT_C_ID);

	try {
		cli.connect(connOpts)->wait();
		cli.start_consuming();
		cli.subscribe(CONSUMER_TOPIC, QOS)->wait();

		// Consume messages

		while (true) {
			auto msg = cli.consume_message();
			if (!msg) break;
			cout << " ================= CONSUMER RECEIVED: "<< msg->get_topic() << ": " << msg->to_string() << endl;
		}

		// Disconnect

		cout << " ================= CONSUMER Shutting down and disconnecting from the MQTT server..." << flush;
		cli.unsubscribe(CONSUMER_TOPIC)->wait();
		cli.stop_consuming();
		cli.disconnect()->wait();
		cout << "OK" << endl;
	}
	catch (const mqtt::exception& exc) {
		cerr << exc.what() << endl;
	}
}
/////////////////////////////////////////////////////////////////////////////
void publish() {
	string	address = SERVER_ADDRESS,
		clientID = CLIENT_P_ID;

	mqtt::async_client client(address, clientID);

	callback cb;
	client.set_callback(cb);

	mqtt::connect_options conopts;
	mqtt::message willmsg(PUBLISHER_TOPIC, LWT_PAYLOAD, 1, true);
	mqtt::will_options will(willmsg);
	conopts.set_will(will);

	try {
		mqtt::token_ptr conntok = client.connect(conopts);
		conntok->wait();

		while(true){
			mqtt::message_ptr pubmsg = mqtt::make_message(PUBLISHER_TOPIC, PAYLOAD1);
			pubmsg->set_qos(QOS);
			client.publish(pubmsg)->wait_for(TIMEOUT);
			cout << " ===================== PUBLISHER SEND: " << PAYLOAD1 << " ===================== " << endl;
			// Now try with itemized publish.

			mqtt::delivery_token_ptr pubtok;
			pubtok = client.publish(PUBLISHER_TOPIC, PAYLOAD2, strlen(PAYLOAD2), QOS, false);
			pubtok->wait_for(TIMEOUT);
			cout << " ===================== PUBLISHER SEND: " << PAYLOAD2 << " ===================== " << endl;

			// Now try with a listener

			action_listener listener;
			pubmsg = mqtt::make_message(PUBLISHER_TOPIC, PAYLOAD3);
			pubtok = client.publish(pubmsg, nullptr, listener);
			pubtok->wait();
			cout << " ===================== PUBLISHER SEND: " << PAYLOAD3 << " ===================== " << endl;

			// Finally try with a listener, but no token

			delivery_action_listener deliveryListener;
			pubmsg = mqtt::make_message(PUBLISHER_TOPIC, PAYLOAD4);
			client.publish(pubmsg, nullptr, deliveryListener);
			cout << " ===================== PUBLISHER SEND: " << PAYLOAD4 << " ===================== " << endl;

			this_thread::sleep_for(std::chrono::seconds(4));

		};
		

		// Double check that there are no pending tokens

		auto toks = client.get_pending_delivery_tokens();
		if (!toks.empty())
			cout << "Error: There are pending delivery tokens!" << endl;

		// Disconnect
		cout << "\nDisconnecting..." << endl;
		conntok = client.disconnect();
		conntok->wait();
		cout << "  ...OK" << endl;
	}
	catch (const mqtt::exception& exc) {
		cerr << exc.what() << endl;
	}

}
void multipleConsume() {
	mqtt::connect_options connOpts;
	connOpts.set_keep_alive_interval(20);
	connOpts.set_clean_session(true);

	mqtt::async_client cli(SERVER_ADDRESS, CLIENT_C_ID);

	try {
		cli.connect(connOpts)->wait();
		cli.start_consuming();
		cli.subscribe(CONSUMER_TOPIC1, QOS)->wait();
		cli.subscribe(CONSUMER_TOPIC2, QOS)->wait();
		cli.subscribe(CONSUMER_TOPIC2, QOS)->wait();
		cli.subscribe("tele", QOS)->wait();

		// Consume messages

		while (true) {
			auto msg = cli.consume_message();
			if (!msg) break;
			cout << " ================= CONSUMER RECEIVED: " << msg->get_topic() << ": " << msg->to_string() << endl;
		}

		// Disconnect

		cout << " ================= CONSUMER Shutting down and disconnecting from the MQTT server..." << flush;
		cli.unsubscribe(CONSUMER_TOPIC)->wait();
		cli.stop_consuming();
		cli.disconnect()->wait();
		cout << "OK" << endl;
	}
	catch (const mqtt::exception& exc) {
		cerr << exc.what() << endl;
	}
}
void multiplePublisher() {
	string	address = SERVER_ADDRESS,
		clientID = CLIENT_P_ID;

	mqtt::async_client client(address, clientID);

	callback cb;
	client.set_callback(cb);

	mqtt::connect_options conopts;

	try {
		mqtt::token_ptr conntok = client.connect(conopts);
		conntok->wait();

		while (true) {
			mqtt::message_ptr pubmsg = mqtt::make_message(PUBLISHER_TOPIC1, PAYLOAD1);
			pubmsg->set_qos(QOS);
			client.publish(pubmsg)->wait_for(TIMEOUT);
			cout << " ===================== PUBLISHER SEND: " << PUBLISHER_TOPIC2 << PAYLOAD1 << " ===================== " << endl;
			// Now try with itemized publish.
			mqtt::delivery_token_ptr pubtok;
			pubtok = client.publish(PUBLISHER_TOPIC2, PAYLOAD2, strlen(PAYLOAD2), QOS, false);
			pubtok->wait_for(TIMEOUT);
			cout << " ===================== PUBLISHER "<< PUBLISHER_TOPIC2 <<" SEND: " << PAYLOAD2 << " ===================== " << endl;
			this_thread::sleep_for(std::chrono::seconds(4));

		};

		// Double check that there are no pending tokens

		auto toks = client.get_pending_delivery_tokens();
		if (!toks.empty())
			cout << "Error: There are pending delivery tokens!" << endl;

		// Disconnect
		cout << "\nDisconnecting..." << endl;
		conntok = client.disconnect();
		conntok->wait();
		cout << "  ...OK" << endl;
	}
	catch (const mqtt::exception& exc) {
		cerr << exc.what() << endl;
	}
}
void ConsumePublish() {
	mqtt::connect_options connOpts;
	connOpts.set_keep_alive_interval(20);
	connOpts.set_clean_session(true);

	mqtt::async_client cli(SERVER_ADDRESS, CLIENT_C_ID);
	callback cb;
	cli.set_callback(cb);

	mqtt::connect_options conopts;
	mqtt::token_ptr conntok = cli.connect(conopts);
	conntok->wait();
	try {

		mqtt::connect_options conopts;
		mqtt::message willmsg(PUBLISHER_TOPIC, LWT_PAYLOAD, 1, true);
		mqtt::will_options will(willmsg);
		conopts.set_will(will);
		std::thread consume([&](){
			//Consume
			try {
				cli.start_consuming();
				for (const auto& each : consumers) {
					cli.subscribe(each, QOS)->wait();
				}
	
				while (true) {
					auto msg = cli.consume_message();
					if (!msg) break;
					cout << " ================= CONSUMER RECEIVED: " << msg->get_topic() << ": " << msg->to_string() << endl;

				}
			}
			catch (const mqtt::exception& exc) {
				cerr << exc.what() << endl;
			}
			
		});
		// Publish messages

		while (true) {
			for (const auto& each: publishers) {
				/*mqtt::message_ptr pubmsg = mqtt::make_message(each, PAYLOAD1);
				pubmsg->set_qos(QOS);
				cli.publish(pubmsg)->wait_for(TIMEOUT);
				cout << " ===================== PUBLISHER: " << PUBLISHER_TOPIC2 << PAYLOAD1 << " ===================== " << endl;
				*/
				mqtt::delivery_token_ptr pubtok;
				pubtok = cli.publish(each, PAYLOAD2, strlen(PAYLOAD2), QOS, false);
				pubtok->wait_for(TIMEOUT);
				cout << " ===================== Itemizer PUBLISHER " << each << " SEND: " << PAYLOAD2 << " ===================== " << endl;
				this_thread::sleep_for(std::chrono::seconds(1));
			}
		}

		// Disconnect
		consume.join();
		cout << " ================= CONSUMER Shutting down and disconnecting from the MQTT server..." << flush;
		for (const auto& each : consumers) {
			cli.unsubscribe(each)->wait();
		}
		cli.stop_consuming();
		cli.disconnect()->wait();
		cout << "OK" << endl;
	}
	catch (const mqtt::exception& exc) {
		cerr << exc.what() << endl;
	}
}
int main(int argc, char* argv[])
{
	/*
	std::thread t1(subscribe);
	std::thread t2(publish);
	t1.join();
	t2.join();
	*/
	//multipleConsume();
	//multiplePublisher();
	ConsumePublish();
	return 0;
}

