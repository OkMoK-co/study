cmake_minimum_required(VERSION 3.5)

project(echo LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Poco CONFIG REQUIRED Net XML Zip Data Util)

add_executable(
	echo
	./src/main.cpp
)

target_link_libraries(echo PRIVATE Poco::Net Poco::XML Poco::Zip Poco::Data Poco::Util)
