import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import Web3 from "web3";
import 'rsuite/styles/index.less';
import "rsuite/dist/rsuite.min.css";
import { Panel, PanelGroup } from 'rsuite';
import { Carousel } from 'rsuite';
import { Notification, toaster } from 'rsuite';
import { Loader } from 'rsuite';
import { Badge } from 'rsuite';

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: black;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const CTNButton = styled.button`
  font-family: 'coder';
  padding: 10px;
  font-size: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #2a1e36;
  padding: 10px;
  letter-spacing: 2px;
  font-weight: bold;
  color: white;
  width: 270px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px black;
  -webkit-box-shadow: 0px 6px 0px -2px black;
  -moz-box-shadow: 0px 6px 0px -2px black;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const Maxbtn = styled.button`
  font-family: 'coder';
  font-size: 0.75rem;
  border-radius: 10px;
  background-color: #b590f1;
  font-weight: bold;
  color: white;
  width: 80px;
  height: 30px;
  cursor: pointer;
  letter-spacing: 2px;
  :hover {
    color: black;
  }
  @media (max-width: 565px) {
    width: 200px;
    height: 50px;
    font-size: 0.75rem;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  padding: 10px;
  font-weight: bold;
  font-size: 30px;
  color: white;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  :hover {
    color: silver;
  }
`;

export const LogoDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
align-content: center;
gap: 10%;
width: 300px;
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: center;
  margin: auto;
  width: 70%;
  border: 2px solid white;
  border-radius: 40px;
  background: linear-gradient(90deg, #b590f1 54%, #3A2152 );
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-height: 80px;
  padding: 10px;
  background: #2A1E36;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 565px) {
    max-height: 220px;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  width: 200px;
  @media (max-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  width: 450px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 450px;
  }
  @media (min-width: 1000px) {
    width: 450px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const Styledroad = styled.img`
  width: 100%;
  border-radius: 5px;
  transition: width 0.5s;
`;

export const StyledImgSmall = styled.img`
  width: 220px;
  height: 220px;
  border-radius: 5px;
  @media (min-width: 900px) {
    width: 220px;
    height: 220px;
  }
  @media (min-width: 1000px) {
    width: 220px;
    height: 220px;
  }
  transition: width 0.5s;
  @media (max-width: 565px) {
    width: 200px;
  }
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: transparent;
  //padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 180px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px white;
  -webkit-box-shadow: 0px 4px 0px -2px white;
  -moz-box-shadow: 0px 4px 0px -2px white;
  @media (max-width: 565px) {
    margin-top: 20px;
  
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("Not Connected");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [tokens, settokens] = useState(1);
  const [brd, setbrd] = useState("2px solid #FFFFFF");
  const [bxsh, setbxsh] = useState("0px 0px 3px 0px #FFFFFF");
  const [DOT, setDOT] = useState("red");
  const [type, setType] = React.useState('info');
  const [placement, setPlacement] = React.useState('topStart');
  const errmessage = (
    <Notification type={'error'} header={'error'} closable>
     Sorry, something went wrong please try again later.
    </Notification>
  );
  const txmessage = (
    <Notification type={'success'} header={'success'} closable>
     Congrats, Mint Was successfull.
    </Notification>
  );
  const mntmessage = (
    <Notification type={'info'} header={'success'} closable>
     <Loader/> Minting in Progress....
    </Notification>
  );
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    DISPLAY_COST: 0,
    WL_Display: 0,
    GAS_LIMIT: 0,
    MAX_PER_TX: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    Telegram: "",
    Discord: "",
    Twitter: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.DISPLAY_COST * tokens;
    let price = Web3.utils.toWei(cost.toString(), 'ether');
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", price);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    setbrd("2px solid yellow");
    setbxsh("0px 0px 3px 0px yellow");
    toaster.push(mntmessage, { placement })
    blockchain.smartContract.methods
      .mint(tokens)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: price,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
        toaster.push(errmessage, { placement })
        setbrd("2px solid red");
        setbxsh("0px 0px 3px 0px red");
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        toaster.push(txmessage, { placement })
        setbrd("2px solid green");
        setbxsh("0px 0px 3px 0px green");
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementtokens = () => {
    let newtokens = tokens - 1;
    if (newtokens < 1) {
      newtokens = 1;
    }
    settokens(newtokens);
  };

  const incrementtokens = () => {
    let newtokens = tokens + 1;
    if (newtokens > CONFIG.MAX_PER_TX) {
      newtokens = CONFIG.MAX_PER_TX;
    }
    settokens(newtokens);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
      setDOT("green");
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <ResponsiveWrapperHeader>

          <LogoDiv>
          <a href="#" target={"_blank"}>
            <StyledLogo alt={"logo"} src={"/config/images/logo.png"} />
          </a>
          </LogoDiv>

          <s.Headerlinks>
            <s.StyledLink href="#story">
              Story
            </s.StyledLink >
            <s.StyledLink href="#sneak">
               Sneak Peaks
              </s.StyledLink>
              <s.StyledLink href="#roadmap">
               Roadmap
              </s.StyledLink>
              <s.StyledLink href="#faq">
               FAQ
              </s.StyledLink>
          </s.Headerlinks>



          <s.HeaderDiv>
          <s.socialDiv>
          <a href={CONFIG.Telegram} target={"_blank"}>
          <s.Icons src="/config/images/telegram.svg" alt="telegram" />
          </a>
            <a href={CONFIG.Twitter} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter" />
          </a>
          <a href={CONFIG.Discord} target={"_blank"}>
          <s.Icons src="/config/images/discord.svg" alt="discord" />
          </a>
          <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
          <s.Icons src="/config/images/opensea.svg" alt="opensea" />
          </a>
          </s.socialDiv>
          <WalletBox>
            {blockchain.account !== "" ? (
            <>
            <s.TextSubTitle style={{fontSize: "1rem", color: "white"}}>
            <Badge color={DOT}/> {walletAddress}
              </s.TextSubTitle>
            </>
            ) : null }
          </WalletBox>
          </s.HeaderDiv>

        </ResponsiveWrapperHeader>
        <s.SpacerLarge/>

        <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextTitle>
            Mint Your {CONFIG.NFT_NAME}
          </s.TextTitle>

        </s.Container>
    
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
        <StyledImg src={"/config/images/11.gif"} alt="image" />
        <s.SpacerSmall/>
            <s.Container flex={1} jc={"center"} ai={"center"} >


           {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder" }}
                >
                  The sale has ended.
                </s.TextSub>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)", fontFamily: "coder"  }}
                >
                  {data.totalSupply} | {CONFIG.MAX_SUPPLY}
                </s.TextSub>
                <s.SpacerSmall />
                <s.TextTotal style={{background: "white" , borderRadius: 5, padding: 8, color: "black"}}>
                      Price&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                <s.SpacerMedium/>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <>
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <CTNButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT Wallet
                      <img style={{width: 30, paddingLeft: 10 }} src={"/config/images/mm.svg"} />
                    </CTNButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                            fontFamily: "coder",
                            fontSize: 20
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                  </>
                ) : (
                  <>
                    <s.AmountContainer style={{
                      border: brd,
                      boxShadow: bxsh,
                    }}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementtokens();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.TEXTamount>
                        &ensp;&ensp;&ensp;&ensp;{tokens}&ensp;&ensp;&ensp;&ensp;
                      </s.TEXTamount>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementtokens();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.AmountContainer>
                    <s.SpacerSmall />
                    <Maxbtn
                        onClick={(e) => {
                          e.preventDefault();
                          settokens(CONFIG.MAX_PER_TX);
                        }}
                        >
                      SetMax
                    </Maxbtn>
                    <s.SpacerSmall />
                    <s.SpacerSmall />
                    <s.TextTotal style={{color: "black"}}>
                      Total&emsp;&emsp;&emsp;&emsp;&emsp;{(CONFIG.DISPLAY_COST * tokens).toString().substring(0, 6)}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextTotal>
                    <s.SpacerSmall />
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"column"}>
                            <StyledButton
                            disabled={claimingNft ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              claimNFTs();
                              getData();
                            }}
                          >
                            {claimingNft ? <Loader speed="fast" content="Minting..." /> : "MINT"} 
                          </StyledButton>
                    </s.Container>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{fontSize: 15}}>
                    Max {CONFIG.MAX_PER_TX} Per Tx
                    </s.TextSubTitle>
                    <s.SpacerXSmall/>
                    <s.TextSubTitle style={{textAlign: "center", fontSize: "1rem"}}>
                    {feedback}
                    </s.TextSubTitle>
              </>
            )}
            </>
            )}
            <s.SpacerMedium />
            </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>


        <s.SpacerLarge />
        <s.SecContainer id="story">
  <s.TextTitle>
    STORY
  </s.TextTitle>
  <s.SpacerLarge/>
  <s.TextP>
    Zombie Squad, residing on the Polygon blockchain, is an exclusive NFT project introducing 3000 limited edition NFTs known as Zombie members. Far beyond conventional blockchain art, Zombie Squad is committed to cultivating a robust community. Our emphasis lies in bringing together crypto and NFT enthusiasts while integrating interactive utilities to elevate the overall NFT experience.
    <br/><br/>
    Dedicated to Community and Innovation
    <br/><br/>
    Zombie Squad is more than a collection of digital assets; it is a testament to community building. Our commitment extends beyond static images, focusing on the creation of a dynamic space that encourages collaboration and engagement. Our goal is to provide a platform where enthusiasts can immerse themselves in a unique NFT experience.
    <br/><br/>
    *Believe in us before it's too late.*
  </s.TextP>
</s.SecContainer>

            <s.SecContainer id="sneak">
            <s.TextTitle>
            Sneak Peaks
            </s.TextTitle>
            <s.SpacerLarge/>
            <s.CBOX>
            <Carousel autoplay className="custom-slider">
    <img src="/config/images/1.jpg" />
    <img src="/config/images/2.jpg" />
    <img src="/config/images/3.jpg" />
    <img src="/config/images/4.jpg" />
    <img src="/config/images/5.jpg" />
  </Carousel>
  </s.CBOX>
              </s.SecContainer>

              <s.SecContainer id="roadmap">
  <s.TextTitle>Roadmap</s.TextTitle>
  <s.SpacerLarge/>
  <s.TextP>
    <b>10% - Artwork Completion:</b> <br />Enter the final stages of crafting 3000 limited edition Zombie NFTs, bringing the captivating artwork to life.
    <br /><br />
    <b>25% - Community Building:</b> <br /> Initiate efforts to build a vibrant community of crypto and NFT enthusiasts, laying the foundation for Zombie Squad's journey.
    <br /><br />
    <b>30% - Whitelist Event and Public Mint:</b> <br />Launch a whitelist event followed by the public mint, allowing early supporters to secure their Zombie NFTs.
    <br /><br />
    <b>40% - Metadata Upload:</b> <br />List all metadata on NFTPORT, providing transparency and revealing rarity ranks and special traits to NFT holders.
    <br /><br />
    <b>50% - Graveyard Unlock:</b><br /> Introduce the decentralized Graveyard, an online entertainment platform for the Zombie Squad community to chill and engage in various activities.
    <br /><br />
    <b>60% - Graveyard Features:</b> <br />Enhance the Graveyard with new utilities, developments, and features, focusing on long-term utility for the Zombie Squad.
    <br /><br />
    <b>70% - Daily NFT Airdrops:</b> <br />Airdrop NFTs daily to Zombie Squad members, utilizing royalties for further development of the Graveyard and adding more traits to spice things up.
    <br /><br />
    <b>80% - Alliance Formation:</b> <br />Form alliances with 20 to 50 proven NFT collections to pool resources and create a collaborative NFT collection with combined utilities.
    <br /><br />
    <b>90% - Continued Development:</b><br /> Continue developing the Zombie Squad ecosystem and utilities, ensuring sustained growth and value for the community.
    <br /><br />
    <b>100% - # D3c0d3_7h3_C2l3V3_4_Cryp70_T0k3n</b><br /> You figure this one out ...
  </s.TextP>
</s.SecContainer>    

<s.SecContainer id="faq">
  <s.TextTitle>
    FAQ
  </s.TextTitle>
  <s.SpacerLarge/>
  <PanelGroup style={{width: "80%", borderColor: "#A9D0D2"}} accordion bordered>
    <Panel header="What makes Zombie Squad NFTs unique?" defaultExpanded>
      <s.TextP style={{textAlign: "left"}}>
        Zombie Squad offers 3000 exclusive NFTs on the Polygon blockchain, each representing a limited edition Zombie Member. Beyond static visuals, we focus on community building and interactive utilities to enrich your NFT experience.
      </s.TextP>
    </Panel>
    <Panel header="How do I get involved in the Zombie Squad community?">
      <s.TextP style={{textAlign: "left"}}>
        Engage with Zombie Squad by following us on social media : joining our Discord community, and staying active on Twitter. Connect with like-minded enthusiasts and be part of our dynamic community. 
      </s.TextP>
    </Panel>
    <Panel header="When is the whitelist and public mint event, and how can I participate?">
      <s.TextP style={{textAlign: "left"}}>
        Details about the whitelist and public mint dates will be announced on our socials, Discord community, and Twitter. Once the day arrives, connect your wallet on our website to mint your unique Zombie Squad NFT.
      </s.TextP>
    </Panel>
    <Panel header="What are the major milestones in Zombie Squad's roadmap?">
      <s.TextP style={{textAlign: "left"}}>
        Key milestones include completing artwork for 3000 Zombie NFTs, community building, a whitelist event, public mint, metadata listing on NFTPORT, and unlocking the Graveyard—an online entertainment platform. We're also exploring alliances with other NFT collections.
      </s.TextP>
    </Panel>
    <Panel header="Can I expect surprises or rewards for participating in Zombie Squad?">
      <s.TextP style={{textAlign: "left"}}>
        Absolutely! Once the Graveyard is halfway completed, anticipate daily NFT airdrops. Our commitment to innovation means ongoing developments and features to keep the community excited.
      </s.TextP>
    </Panel>
    <Panel header="How can I stay updated on Zombie Squad's progress and announcements?">
      <s.TextP style={{textAlign: "left"}}>
        Stay informed by following our official social media channels : joining our Discord community, and keeping an eye on Twitter. Regular updates will ensure you don't miss out on the latest Zombie Squad news and events.
      </s.TextP>
    </Panel>
  </PanelGroup>
</s.SecContainer>


            <s.SecContainer id="">
                <s.socialDiv>
          <a href={CONFIG.Telegram} target={"https://t.me/zombiesquadnft"}>
          <s.Icons src="/config/images/telegram.svg" alt="telegram" />
          </a>
            <a href={CONFIG.Twitter} target={"_blank"}>
          <s.Icons src="/config/images/twitter.svg" alt="twitter" />
          </a>
          <a href={CONFIG.Discord} target={"_blank"}>
          <s.Icons src="/config/images/discord.svg" alt="discord" />
          </a>
          <a href={CONFIG.MARKETPLACE_LINK} target={"_blank"}>
          <s.Icons src="/config/images/opensea.svg" alt="opensea" />
          </a>
          </s.socialDiv>
          <s.SpacerLarge/>
          <s.TextP>
          Copyright © 2022 {CONFIG.NFT_NAME}
          </s.TextP>
            </s.SecContainer>




        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
