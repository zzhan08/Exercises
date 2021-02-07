#ifndef NOMINMAX
#define NOMINMAX
#endif
#include <event2/event.h>
#include <amqpcpp.h>
#include <amqpcpp/libevent.h>

/**
 *  Main program
 *  @return int
 */
int main()
{
    // access to the event loop
    auto evbase = event_base_new();
    
    // handler for libevent
    AMQP::LibEventHandler handler(evbase);
    /*
    //std::string host, uint16_t port, Login login, std::string vhost, bool secure = false
    // make a connection
    
    AMQP::Login login("admin", "K0ukku55");
    AMQP::TcpConnection connection(&handler, AMQP::Address("amqp://192.168.1.249/", 5672, login, "/"));

    // we need a channel too
    AMQP::TcpChannel channel(&connection);

    // create a temporary queue
    channel.declareQueue(AMQP::exclusive).onSuccess([&connection](const std::string& name, uint32_t messagecount, uint32_t consumercount) {

        // report the name of the temporary queue
        std::cout << "declared queue " << name << std::endl;

        // now we can close the connection
        connection.close();
        });

    // run the loop
    event_base_dispatch(evbase);

    event_base_free(evbase);
    */
    // done
    return 0;
}
