import { Modal } from 'antd';
import React, { useState, useEffect } from 'react';


export default function SubscriptionModal({openSub, setOpenSub}) {
 const handleCancel = () => {
   console.log("Clicked cancel button");
   setOpenSub(false);
 };
    return (
      <>
        <Modal
          title="Subscriptions"
          open={openSub}
          style={{
            top: 20,
            height: "550px",
            overflowX: "hidden",
            overflowY: "scroll",
          }}
          width={350}
          onCancel={handleCancel}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p>
              Please click{" "}
              <span>
                <a style={{fontSize:"18px", textDecoration:"underline"}} target="_blank" href="https://skoutpay.com" >here</a>
              </span>{" "}
              to subscribe and see our plans.
            </p>
          </div>
        </Modal>
      </>
    );
}