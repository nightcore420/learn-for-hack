#!/bin/bash

function passwd_generator() {
    choose() { echo ${1:RANDOM%${#1}:1}; }
    {
        choose '!@#$%^\&'
        choose '0123456789'
        choose 'abcdefghijklmnopqrstuvwxyz'
        choose 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for i in $( seq 1 $(( 7 + RANDOM % 8 )) )
            do
                choose '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        done
    } | sort -R | tr -d '\n'
    echo ""
}

echo "Password: `passwd_generator`"
