#define POCO_STATIC

#include "MultiplexedServer.hpp"

const Poco::UInt16 PORT = 8080;
const int MAX_CONNECT_COUNT = 256;

int main (int argc, char **argv)
{
	MultiplexedServer server;

	server.Init(MAX_CONNECT_COUNT);
	server.Start(PORT);

	return 0;
}

