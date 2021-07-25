import React from "react";
import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";
import styles from "./styles/Block.module.css";

dayjs.extend(relativePlugin);

const sampleBlock = {
  prevHash:
    "026bc5c5926b63de0323e66d764813e3413a3632bd9a4e5a04e8d407a749f2eba2",
  hash: "026bc5c5926b63de0323e66d764813e3413a3632bd9a4e5a04e8d407a749f2eba2",
  timeStamp: 1627165862563,
  nonce: 13000,
  height: 10,
};

export default function Block({ active = false }) {
  return (
    <div
      style={{ border: `${active ? "1px solid blue" : null}` }}
      className={styles.card}
    >
      <h3 className={styles.cardHeading}>
        Block {sampleBlock.height}{" "}
        {sampleBlock.height === 1 && (
          <span className="text_secondary">(Genesis Block)</span>
        )}
      </h3>
      <div className={styles.cardBody}>
        <h4>Hash</h4>
        <p className="text_primary">{sampleBlock.hash.slice(0, 20)}...</p>
        <h4>Previous Block Hash</h4>
        <p className="text_info">{sampleBlock.prevHash.slice(0, 20)}...</p>
        <h4>Nonce</h4>
        <p className="text_secondary">{sampleBlock.nonce}</p>
        <h4>Timestamp</h4>
        <p className="text_secondary">
          {dayjs(sampleBlock.timeStamp).fromNow()}
        </p>
      </div>
    </div>
  );
}
