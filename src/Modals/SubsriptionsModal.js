"use client";
import React, { useEffect, useState } from "react";
import { Modal, Input, Space, message } from "antd";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { getActiveub, getSublist, subscribe } from "../api";
import PriceCard from "../PriceCard";
import Payment from "../Payment";
import ThreeTierPricing from "../PriceWrapper";

const SubscriptionModal = ({ openSub, setOpenSub, user }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [subscriptionList, setSubscriptionList] = useState([]);
  const [currentSub, setCurrentSub] = useState(null);
  const [amount, setAmount] = useState(null);

  //either show list of subcriptions or checkout
  const [mode, setMode] = useState("list");

  useEffect(() => {
    user && fetchCurrentSub();
  }, [user]);
  useEffect(() => {
    user && fetchSubList();
  }, [user]);

  const fetchCurrentSub = () => {
    getActiveub(user._id, user.token)
      .then(res=>{
        console.log(res.data.data)
        setCurrentSub(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(user);
  const handleFreeTrial = () => {
    subscribe({
      name: "Trial",
      userId: user._id,
      count: 5,
      amount: 0,
      active: true,
      merchant: "free",
      token:user.token
    })
      .then((res) => {
        message.success("Subscription created");
        fetchSubList();
      })
      .catch((res) => {
        console.log(res.error.message);
        message.error(res.data.message);
      });
  };
  const fetchSubList = () => {
    getSublist(user.token).then((res) => {
      console.log(res.data);
      setSubscriptionList(res.data.subs);
    }).catch(err=>{
      console.log(err)
    })
  };
  

  return (
    <>
      <div style={{ margin: "0 auto", textAlign:"center" }}>
        {mode == "list" ? (
          <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            {!currentSub ? (
              <div>
                <Box py={12}>
                  <VStack spacing={2} textAlign="center">
                    <Heading as="h1" fontSize="4xl">
                      Plans that fit your need
                    </Heading>
                    <Text fontSize="lg" color={"gray.500"}>
                      Start your search with free trial!. No credit card needed.
                    </Text>
                    <Button onClick={handleFreeTrial}>Start Trial</Button>
                  </VStack>
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    textAlign="center"
                    justify="center"
                    spacing={{ base: 4, lg: 10 }}
                    py={10}
                  >
                    {subscriptionList?.map((w, i) => {
                      return (
                        <ThreeTierPricing
                          key={i}
                          setMode={setMode}
                          setAmount={setAmount}
                          limit={w.limit}
                          name={w.name}
                          amount={w.amount*100}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  width: "280px",
                }}
              >
                <h2 style={{textAlign:"center",  margin:"30px"}}>Your current subscription</h2>
                <ThreeTierPricing
                  setMode={setMode}
                  setAmount={setAmount}
                  limit={currentSub.count-currentSub.usage}
                  name={currentSub.name}
                  amount={currentSub.amount}
                  current={true}
                />
              </div>
            )}
          </div>
        ) : (
          <Payment style={{ width: "480px" }} user={user}  amount={amount} />
        )}
      </div>
    </>
  );
};

export default SubscriptionModal;
