"use client";

import {
  Box,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";



function PriceWrapper(props) {
  const { children } = props;

  

  return (
    <Box
      mb={5}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
    >
      {children}
    </Box>
  );
}

export default function ThreeTierPricing({name, limit, setMode, setAmount, current, amount}) {
     const handleSubscribe = () => {
       setAmount({amount:amount/100, name});
       setMode("checkout");
     };
    const redish = useColorModeValue("red.300", "red.700");
    const greyish = useColorModeValue("gray.900", "gray.300");
  return (
    <PriceWrapper>
      <Box position={name === "Standard" ? "relative" : "inherit"}>
        {name == "Standard" && (
          <Box
            position="absolute"
            top="-16px"
            left="50%"
            style={{ transform: "translate(-50%)" }}
          >
            <Text
              textTransform="uppercase"
              bg={redish}
              px={3}
              py={1}
              color={greyish}
              fontSize="sm"
              fontWeight="600"
              rounded="xl"
            >
              Most Popular
            </Text>
          </Box>
        )}
        <Box py={4} px={12}>
          <Text fontWeight="500" justifyContent="center" fontSize="2xl">
            {current ? `${name} ` : ""}
          </Text>
          <HStack justifyContent="center">
            <Text fontSize="3xl" fontWeight="600">
              $
            </Text>
            <Text fontSize="5xl" fontWeight="900">
              {amount/100 }
            </Text>
            {current ? "Paid" : ""}
          </HStack>
        </Box>
        <VStack
          bg={useColorModeValue("gray.50", "gray.700")}
          py={4}
          borderBottomRadius={"xl"}
        >
          <List spacing={3} textAlign="start" px={10}>
            {current && (
              <ListItem fontSize="2xl" fontWeight="700">
                {limit} Searches Left
              </ListItem>
            )}
            <ListItem fontWeight="500">
              <ListIcon as={FaCheckCircle} color="green.500" />
              Price Comparison
            </ListItem>
            {!current && (
              <ListItem  fontWeight="500">
                <ListIcon as={FaCheckCircle} color="green.500" />
                {limit} Product Searches
              </ListItem>
            )}
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Amazon
            </ListItem>

            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Walmart
            </ListItem>
            <ListItem>
              <ListIcon as={FaCheckCircle} color="green.500" />
              Ebay
            </ListItem>
            {name !== "Basic" &&name !=="Trial"? (
              <>
                {" "}
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Aliexpress
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                  Rakuten & Jingdong
                </ListItem>{" "}
              </>
            ) : null}
            <ListItem  fontWeight="600">
              <ListIcon as={FaCheckCircle} color="green.500" />
              {name == "Basic"
                ? "Limited"
                : name == "Standard"
                ? "Upper"
                : "Unlimited"}{" "}
              Access To Wishlist
            </ListItem>
            <ListItem  fontWeight="600">
              <ListIcon as={FaCheckCircle} color="green.500" />
              Social Sharing
            </ListItem>
            <ListItem  fontWeight="600">
              <ListIcon as={FaCheckCircle} color="green.500" />
              Currency Converter
            </ListItem>
          </List>
          <Box w="80%" pt={7}>
            {!current && (
              <Button
                disabled={current}
                onClick={handleSubscribe}
                w="full"
                colorScheme="red"
                variant={name == "Standard" ? null : "outline"}
              >
                Start
              </Button>
            )}
          </Box>
        </VStack>
      </Box>
    </PriceWrapper>
  );
}
