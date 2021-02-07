// RabbitMQProducer.cpp : Defines the entry point for the console application.
//
//#include <SimpleAmqpClient.h>
#include<chrono>
#include<thread>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <iostream>

#include <amqp.h>
#include <amqp_tcp_socket.h>
#include<string>  

#include <assert.h>

#define SUMMARY_EVERY_US 1000000
#include "utils.h"
void send_batch(amqp_connection_state_t conn) {
    uint64_t start_time = now_microseconds();
    int i;
    int sent = 0;
    int previous_sent = 0;
    uint64_t previous_report_time = start_time;
    uint64_t next_summary_time = start_time + SUMMARY_EVERY_US;
    std::string keys[] = {"my-topic", "my-topic1"};
    std::string keys1[] = { "my-topic3", "my-topic4" };

    for (int count = 0;;count++) {
        std::string message = std::string("sent new message message: "+std::to_string(count));
        amqp_bytes_t message_bytes = amqp_cstring_bytes(message.c_str());
        uint64_t now = now_microseconds();
        /*
        *  amqp_connection_state_t state, amqp_channel_t channel,
    amqp_bytes_t exchange, amqp_bytes_t routing_key, amqp_boolean_t mandatory,
    amqp_boolean_t immediate, struct amqp_basic_properties_t_ const *properties,
    amqp_bytes_t body
        */
        int iter = count % 2;
        amqp_bytes_t routinkey = amqp_cstring_bytes(keys[iter].c_str());
        die_on_error(amqp_basic_publish(conn, 1, amqp_cstring_bytes("my-exchange"),
            routinkey, 0, 0, NULL,
            message_bytes),
            "Publishing");
        std::cout << "sendMessage "<< message << std::endl;
        std::string message1 = std::string("sent new message message ot new: " + std::to_string(count));
        amqp_bytes_t message_bytes1 = amqp_cstring_bytes(message1.c_str());
        routinkey = amqp_cstring_bytes(keys1[iter].c_str());
        die_on_error(amqp_basic_publish(conn, 1, amqp_cstring_bytes("my-exchange1"),
            routinkey, 0, 0, NULL,
            message_bytes1),
            "Publishing");
        std::cout << "sendMessage " << message1 << std::endl;
        std::this_thread::sleep_for(std::chrono::milliseconds(2000));
    }
}
void run(amqp_connection_state_t conn) {
    uint64_t start_time = now_microseconds();
    int received = 0;
    int previous_received = 0;
    uint64_t previous_report_time = start_time;
    uint64_t next_summary_time = start_time + SUMMARY_EVERY_US;

    amqp_frame_t frame;

    uint64_t now;

    for (;;) {
        amqp_rpc_reply_t ret;
        amqp_envelope_t envelope;

        now = now_microseconds();
        if (now > next_summary_time) {
            int countOverInterval = received - previous_received;
            double intervalRate =
                countOverInterval / ((now - previous_report_time) / 1000000.0);
            printf("%d ms: Received %d - %d since last report (%d Hz)\n",
                (int)(now - start_time) / 1000, received, countOverInterval,
                (int)intervalRate);

            previous_received = received;
            previous_report_time = now;
            next_summary_time += SUMMARY_EVERY_US;
        }

        amqp_maybe_release_buffers(conn);
        ret = amqp_consume_message(conn, &envelope, NULL, 0);
        std::cout << (char*)(envelope.routing_key.bytes) << " send message: " << (char*)(envelope.message.body.bytes) <<std::endl;
        if (AMQP_RESPONSE_NORMAL != ret.reply_type) {
            if (AMQP_RESPONSE_LIBRARY_EXCEPTION == ret.reply_type &&
                AMQP_STATUS_UNEXPECTED_STATE == ret.library_error) {
                if (AMQP_STATUS_OK != amqp_simple_wait_frame(conn, &frame)) {
                    return;
                }

                if (AMQP_FRAME_METHOD == frame.frame_type) {
                    switch (frame.payload.method.id) {
                    case AMQP_BASIC_ACK_METHOD:
                        // if we've turned publisher confirms on, and we've published a
                        // message here is a message being confirmed.
                        //
                        break;
                    case AMQP_BASIC_RETURN_METHOD:
                        // if a published message couldn't be routed and the mandatory
                        // flag was set this is what would be returned. The message then
                        // needs to be read.
                        //
                    {
                        amqp_message_t message;
                        ret = amqp_read_message(conn, frame.channel, &message, 0);
                        if (AMQP_RESPONSE_NORMAL != ret.reply_type) {
                            return;
                        }

                        amqp_destroy_message(&message);
                    }

                    break;

                    case AMQP_CHANNEL_CLOSE_METHOD:
                        // a channel.close method happens when a channel exception occurs,
                        // this can happen by publishing to an exchange that doesn't exist
                        // for example.
                        //
                        // In this case you would need to open another channel redeclare
                        // any queues that were declared auto-delete, and restart any
                        // consumers that were attached to the previous channel.
                        //
                        return;

                    case AMQP_CONNECTION_CLOSE_METHOD:
                        // a connection.close method happens when a connection exception
                        // occurs, this can happen by trying to use a channel that isn't
                        // open for example.
                        //
                        // In this case the whole connection must be restarted.
                        //
                        return;

                    default:
                        fprintf(stderr, "An unexpected method was received %u\n",
                            frame.payload.method.id);
                        return;
                    }
                }
            }

        }
        else {
            amqp_destroy_envelope(&envelope);
        }

        received++;
    }
};

int runRabitmqCConsummer() {
    char const* hostname;
    int port, status;
    char const* exchange;
    char const* queue;

    amqp_socket_t* socket = NULL;
    amqp_connection_state_t conn;

    hostname = "192.168.1.249";
    port = 5672;
    exchange = "amq.topic";
    queue = "my-queue";
    amqp_bytes_t queuename = amqp_cstring_bytes(queue);
   
    amqp_bytes_t ex = amqp_cstring_bytes(exchange);

    conn = amqp_new_connection();

    socket = amqp_tcp_socket_new(conn);

    if (!socket) {
        die("creating TCP socket");
    }

    status = amqp_socket_open(socket, hostname, port);
    if (status) {
        die("opening TCP socket");
    }

    die_on_amqp_error(amqp_login(conn, "/", 0, 131072, 0, AMQP_SASL_METHOD_PLAIN,
        "guest", "guest"),
        "Logging in");
    amqp_channel_open(conn, 1);
    die_on_amqp_error(amqp_get_rpc_reply(conn), "Opening channel");
    char const* bindingkey;
    bindingkey = "my-topic";
    amqp_bytes_t bkey = amqp_cstring_bytes(bindingkey);
    amqp_queue_bind(conn, 1, queuename,
        ex, bkey,
        amqp_empty_table);
    die_on_amqp_error(amqp_get_rpc_reply(conn), "Binding queue");

    const char* consumer_tag = "amq.ctag-LT6ibGYNFGLiqs5SCoOzbQ";
    amqp_bytes_t tag = amqp_cstring_bytes(consumer_tag);

    amqp_basic_consume(conn, 1, queuename, amqp_empty_bytes, 0, 1, 0,
       amqp_empty_table);
    die_on_amqp_error(amqp_get_rpc_reply(conn), "Consuming");

    //send_batch(conn, queuename, bkey);

    run(conn);

    amqp_bytes_free(queuename);

    die_on_amqp_error(amqp_channel_close(conn, 1, AMQP_REPLY_SUCCESS),
        "Closing channel");
    die_on_amqp_error(amqp_connection_close(conn, AMQP_REPLY_SUCCESS),
        "Closing connection");
    die_on_error(amqp_destroy_connection(conn), "Ending connection");
    return 0;

};

int runDeclare() {
    char const* hostname;
    int port, status;

    amqp_socket_t* socket = NULL;
    amqp_connection_state_t conn;

    hostname = "192.168.1.9";
    port = 5672;



    conn = amqp_new_connection();

    socket = amqp_tcp_socket_new(conn);

    if (!socket) {
        die("creating TCP socket");
    }

    status = amqp_socket_open(socket, hostname, port);
    if (status) {
        return status;
    }

    die_on_amqp_error(amqp_login(conn, "/", 0, 131072, 0, AMQP_SASL_METHOD_PLAIN,
        "guest", "guest"),
        "Logging in");
    amqp_channel_open(conn, 1);
    die_on_amqp_error(amqp_get_rpc_reply(conn), "Opening channel");
    {
        char const* exchange;
        exchange = "my-exchange1";
        amqp_bytes_t ex = amqp_cstring_bytes(exchange);

        char const* queue;
        queue = "the-queue1";
        amqp_bytes_t queuename = amqp_cstring_bytes(queue);
        const char* exchangetype = "topic";
        amqp_exchange_declare_ok_t* e = amqp_exchange_declare(conn, 1, ex,
            amqp_cstring_bytes(exchangetype), 0, 0, 0, 0,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Declaring exchange");
        if (ex.bytes == NULL) {
            fprintf(stderr, "Out of memory while copying exchange name");
            return 1;
        }
        amqp_queue_declare_ok_t* r = amqp_queue_declare(
            conn, 1, queuename, 0, 0, 0, 1, amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Declaring queue");
        queuename = amqp_bytes_malloc_dup(r->queue);
        if (queuename.bytes == NULL) {
            fprintf(stderr, "Out of memory while copying queue name");
            return 1;
        }
        char const* bindingkey;
        bindingkey = "my-topic3";
        amqp_bytes_t bkey = amqp_cstring_bytes(bindingkey);
        amqp_queue_bind(conn, 1, queuename,
            ex, bkey,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Binding queue");

        char const* bindingkey1;
        bindingkey1 = "my-topic4";
        bkey = amqp_cstring_bytes(bindingkey1);
        amqp_queue_bind(conn, 1, queuename,
            ex, bkey,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Binding queue");
        amqp_basic_consume(conn, 1, queuename, amqp_empty_bytes, 0, 1, 0,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Consuming");
    }
    {
        char const* exchange;
        exchange = "my-exchange";
        amqp_bytes_t ex = amqp_cstring_bytes(exchange);

        char const* queue;
        queue = "the-queue";
        amqp_bytes_t queuename = amqp_cstring_bytes(queue);
        const char* exchangetype = "topic";
        amqp_exchange_declare_ok_t* e = amqp_exchange_declare(conn, 1, ex,
            amqp_cstring_bytes(exchangetype), 0, 0, 0, 0,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Declaring exchange");
        if (ex.bytes == NULL) {
            fprintf(stderr, "Out of memory while copying exchange name");
            return 1;
        }
        amqp_queue_declare_ok_t* r = amqp_queue_declare(
            conn, 1, queuename, 0, 0, 0, 1, amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Declaring queue");
        queuename = amqp_bytes_malloc_dup(r->queue);
        if (queuename.bytes == NULL) {
            fprintf(stderr, "Out of memory while copying queue name");
            return 1;
        }
        char const* bindingkey;
        bindingkey = "my-topic";
        amqp_bytes_t bkey = amqp_cstring_bytes(bindingkey);
        amqp_queue_bind(conn, 1, queuename,
            ex, bkey,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Binding queue");

        char const* bindingkey1;
        bindingkey1 = "my-topic1";
        bkey = amqp_cstring_bytes(bindingkey1);
        amqp_queue_bind(conn, 1, queuename,
            ex, bkey,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Binding queue");
        amqp_basic_consume(conn, 1, queuename, amqp_empty_bytes, 0, 1, 0,
            amqp_empty_table);
        die_on_amqp_error(amqp_get_rpc_reply(conn), "Consuming");
    }
    send_batch(conn);

    //run(conn);

    //amqp_bytes_free(queuename);

    die_on_amqp_error(amqp_channel_close(conn, 1, AMQP_REPLY_SUCCESS),
        "Closing channel");
    die_on_amqp_error(amqp_connection_close(conn, AMQP_REPLY_SUCCESS),
        "Closing connection");
    die_on_error(amqp_destroy_connection(conn), "Ending connection");
    return 0;
}
int main(int argc, char const* const* argv)
{
    //return runRabitmqCConsummer();
    runDeclare();

    return 0;
}

