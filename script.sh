#!/bin/bash

while read -r line; do
    eval $line
    sleep 1
done < ./modelList.sh

exit