import React, {useContext, useState, useEffect} from "react";
import QRCode from 'qrcode.react';
import { Erc20VerifierContext } from "../context/ERC20VerifierContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import sampleJson from '../constants/sampleJson.json'

const styles = {
  root: {
    color: "#2C1752",
    fontFamily: "sans-serif",
    textAlign: "center",
    color: "#2be809"
  },
  title: {
    color: "#2be809"
  }
};

// update with your contract address
const deployedContractAddress = "0x239ddDb79bEA7ecAE73B6E09Ed6C41be3e7c6318";

// more info on query based requests: https://0xpolygonid.github.io/tutorials/wallet/proof-generation/types-of-auth-requests-and-proofs/#query-based-request
const qrProofRequestJson = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    reason: "airdrop participation",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              vaccinated:{
                $eq: 1
              }
            },
            schema: {
              url: "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/8a01ed9f-e5b8-4fc3-b8cc-6ebaf5d87017.json-ld",
              type: "VaccinationProof"
            }
          }
        }
      }
    ]
  }
};

export const Home = () => {
  const { checkMintEvent, toastmsg } = useContext(Erc20VerifierContext);
  const [txnSuccess, setTxnSuccess] = useState(false)
  if(toastmsg){
    setTxnSuccess(true)
    toast(toastmsg)
  }
  if(!toastmsg && !txnSuccess){
    setTimeout(() => {
      toast('Valdation timed out!')
    }, 1000 * 60 * 2);
  }
  return (
    <div style={styles.root}>
        <h2 style={styles.title}>
          Health Pass
        </h2>
        <h3>
          Vaccine verification
        </h3>
        <p>
          Complete vaccine verification by issuing yourself a Polygon ID claim via
          <a
            href="https://polygontechnology.notion.site/Issue-yourself-a-KYC-Age-Credential-claim-a06a6fe048c34115a3d22d7d1ea315ea"
            target="_blank"
          > Polygon Community
          </a>
        </p>
        <p>then scan QR code within Polygon ID app to verify vaccination</p>

        <div>
          <QRCode
            renderAs="canvas" 
            style={{ width: 256, height: 256}}
            value={JSON.stringify(qrProofRequestJson)}
          />
        </div>
        <ToastContainer />
      </div>
  )
}
