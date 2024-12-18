import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { FaFacebook, FaGithub, FaReddit, FaTwitter } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

const CoinPage = () => {
  const [coin, setCoin] = useState();
  const params = useParams();
  // console.log(params);
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?tickers=true&market_data=true&sparkline=true`;
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data);
      // console.log(response.data);
    });
  }, [url]);

  // console.log(coin?.links?.homepage[0]);

  return (
    <div className="rounded-div my-12 py-8">
      <a href={`${coin?.links?.homepage[0]}`} target="_blank" rel="noreferrer">
        <div className="flex py-8">
          <img className="w-20 mr-8" src={coin?.image?.large} alt="/" />
          <div>
            <p className="text-3xl font-bold">{coin?.name} price</p>
            <p>({coin?.symbol?.toUpperCase()} / USD)</p>
          </div>
        </div>
      </a>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex justify-between">
            {coin?.market_data?.current_price ? (
              <p className="text-3xl font-bold">
                ${coin?.market_data?.current_price?.usd.toLocaleString()}
              </p>
            ) : (
              <p>7 Day</p>
            )}
          </div>
          <div>
            <Sparklines data={coin?.market_data?.sparkline_7d?.price}>
              <SparklinesLine color="teal" />
            </Sparklines>
          </div>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Cap</p>
              {coin?.market_data?.market_cap ? (
                <p>${coin.market_data?.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Volume (24h)</p>
              {coin?.market_data?.total_volume ? (
                <p>${coin.market_data?.total_volume.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">24 High</p>
              {coin?.market_data?.high_24h ? (
                <p>${coin.market_data?.high_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">24 Low</p>
              {coin?.market_data?.low_24h ? (
                <p>${coin.market_data?.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold">Market Stats</p>
          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Market Rank</p>
              {coin?.market_cap_rank}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Hashing Algorithms</p>
              {coin?.hashing_algorithm ? (
                <p>{coin?.hashing_algorithm}</p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Trust Score</p>
              {coin?.tickers ? (
                <p>{coin?.liquidity_score?.toFixed(2)}</p>
              ) : null}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <p className="text-gray-500 text-sm">Price Change (24h)</p>
              {coin?.market_data ? (
                <p>
                  {coin?.market_data.price_change_percentage_24h.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (7d)</p>
              {coin?.market_data ? (
                <p>
                  {coin?.market_data.price_change_percentage_7d.toFixed(2)}%
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Price Change (14d)</p>
              {coin?.market_data ? (
                <p>
                  {coin?.market_data.price_change_percentage_14d.toFixed(2)}%
                </p>
              ) : null}
            </div>
          </div>
          <div className="flex justify-between py-4">
            <div className="flex">
              <div className="mr-24">
                <div>
                  <p className="text-gray-500 text-sm">Price Change (30d)</p>
                  {coin?.market_data ? (
                    <p>
                      {coin?.market_data.price_change_percentage_30d.toFixed(2)}
                      %
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Price Change (60d)</p>
                  {coin?.market_data ? (
                    <p>
                      {coin?.market_data.price_change_percentage_60d.toFixed(2)}
                      %
                    </p>
                  ) : null}
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Price Change (1Y)</p>
                  {coin?.market_data ? (
                    <p>
                      {coin?.market_data.price_change_percentage_1y.toFixed(2)}%
                    </p>
                  ) : null}
                </div>
              </div>
              <div>
                <div>
                  {coin?.links?.homepage[0] ? (
                    <a
                      href={`${coin?.links?.homepage[0]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <button className="w-full my-2 py-3 px-6 bg-button text-btnText rounded-2xl shadow-xl font-bold">
                        Go to docs
                      </button>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-around p-4 text-accent">
            <a
              href={`https://twitter.com/${coin?.links?.twitter_screen_name}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={25} />
            </a>
            <FaFacebook size={25} />
            <a
              href={`${coin?.links?.subreddit_url}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaReddit size={25} />
            </a>
            <a
              href={`${coin?.links?.repos_url?.github[0]}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={25} />
            </a>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="py-4">
        <p className="text-xl font-bold">About {coin?.name}</p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin?.description ? coin?.description?.en : ""
            ),
          }}
        ></p>
      </div>
    </div>
  );
};

export default CoinPage;