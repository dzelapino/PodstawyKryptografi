#!/bin/bash
# Made by Krzysztof Kołodziejski

cat hash-.pdf personal.txt | md5sum | cut -d ' ' -f 1 > diff-temp.txt
cat hash-.pdf personal_.txt | md5sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | sha1sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | sha1sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | sha224sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | sha224sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | sha256sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | sha256sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | sha384sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | sha384sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | sha512sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | sha512sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal.txt | b2sum | cut -d ' ' -f 1 >> diff-temp.txt
cat hash-.pdf personal_.txt | b2sum | cut -d ' ' -f 1 >> diff-temp.txt

