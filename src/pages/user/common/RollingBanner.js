import React, { useEffect, useRef, useState } from "react";
import styles from '../../../style/rollingBanner.module.css';

const RollingBanner = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  // 자동 슬라이드
  useEffect(() => {
    if (items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  // 인덱스 변경 시 스크롤 대신 transform으로 이동 처리
  // width, translateX 계산
  const trackWidthPercent = items.length * 100;
  const translateXPercent = -(currentIndex * (100 / items.length));

  const fallbackImage = process.env.PUBLIC_URL + "/asset/images/BSN 신타6 엣지 1.92kg 초코 (48회분).png";

  const normalizePath = (path) => path.replace(/\\/g, "/");

  const resolveImageUrl = (imgUrl) => {
    if (!imgUrl) return fallbackImage;
    const normalized = normalizePath(imgUrl);
    const publicIndex = normalized.indexOf("public");
    if (publicIndex !== -1) {
      const relativePath = normalized.slice(publicIndex + "public".length);
      return process.env.PUBLIC_URL + relativePath;
    } else {
      const imgIndex = normalized.indexOf("/img");
      if (imgIndex !== -1) {
        const relativeImgPath = normalized.slice(imgIndex);
        return `${relativeImgPath}`;
      } else if (normalized.startsWith("blob:") || normalized.startsWith("data:")) {
        return normalized;
      } else {
        return fallbackImage;
      }
    }
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const goBannerUrl = (url)=>{
    if(url !=null){
      window.open(url, '_blank');
    }
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.rollingWrapper}>
        <button
          className={styles.navBtn}
          onClick={() => goToIndex((currentIndex - 1 + items.length) % items.length)}
          aria-label="이전 배너"
        >
          &#8249;
        </button>

        <div className={styles.rollingContainer} ref={containerRef}>
          <div
            className={styles.rollingTrack}
            style={{
              width: `${trackWidthPercent}%`,
              transform: `translateX(${translateXPercent}%)`,
            }}
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className={styles.rollingItem}
                style={{ width: `${100 / items.length}%`, cursor:"pointer" }}
                onClick={()=> goBannerUrl(item.url)}
              >
                <img src={resolveImageUrl(item.imgUrl)} alt={`banner-${idx}`} />
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.navBtn}
          onClick={() => goToIndex((currentIndex + 1) % items.length)}
          aria-label="다음 배너"
        >
          &#8250;
        </button>
      </div>

      <div className={styles.dotsWrapper}>
        {items.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
            onClick={() => goToIndex(idx)}
            role="button"
            aria-label={`배너 ${idx + 1}번`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                goToIndex(idx);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RollingBanner;
