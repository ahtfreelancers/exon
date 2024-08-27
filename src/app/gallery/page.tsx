"use client";

import { useState } from "react";
import Navbar from "@/components/core/Navbar";
import Image from "next/image";
import { Modal, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useScreens } from "@/hooks/useScreens";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function Gallery() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/016.jpg",
    "/gallery/026.jpg",
    "/gallery/027.jpg",
    "/gallery/032.jpg",
    "/gallery/035.jpg",
    "/gallery/038.jpg",
    "/gallery/042.jpg",
    "/gallery/043.jpg",
    "/gallery/044.jpg",
    "/gallery/045.jpg",
    "/gallery/050.jpg",
    "/gallery/051.jpg",
    "/gallery/054.jpg",
    "/gallery/057.jpg",
    "/gallery/058.jpg",
    "/gallery/061.jpg",
    "/gallery/065.jpg",
    "/gallery/066.jpg",
    "/gallery/069.jpg",
    "/gallery/073.jpg",
    "/gallery/074.jpg",
    "/gallery/076.jpg",
    "/gallery/077.jpg",
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { md }: any = useScreens();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const showModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrentIndex(null);
  };

  const showNextImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) => (prevIndex! + 1) % images.length);
    }
  };

  const showPrevImage = () => {
    if (currentIndex !== null) {
      setCurrentIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
    }
  };

  return (
    <main className="relative bg-white">
      <Navbar />
      <section className="px-2 md:px-16 mb-10">
        <div
          className="py-20 md:py-16 3xl:py-[94px] bg-primary rounded-[28px] md:rounded-[52px] mt-1 md:mt-8 flex justify-center"
          data-aos="fade-up"
        >
          <h2 className="text-white text-3xl md:text-4xl spbp:text-7xl">Gallery</h2>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 md:px-16 py-10">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 3xl:grid-cols-4 gap-4"
          data-aos="fade-up"
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-105"
              onClick={() => (md ? showModal(index) : null)}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                layout="responsive"
                width={600}
                height={500}
                className="object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-500 ease-in-out"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Ant Design Modal */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ padding: 0, backgroundColor: "rgba(0, 0, 0, 0.7)", textAlign: "center" }}
        className="custom-modal"
        width={md ? "60vw" : "90vw"}
      >
        {currentIndex !== null && (
          <div className="relative">
            <Button
              type="text"
              icon={<LeftOutlined />}
              onClick={showPrevImage}
              className="absolute top-1/2 left-[-20px] transform -translate-y-1/2 text-black z-[99999] hover:text-primary transition-colors"
              style={{ fontSize: "24px" }}
            />
            <div className="overflow-hidden">
              <Image
                src={images[currentIndex]}
                alt={`Gallery Image ${currentIndex + 1}`}
                layout="responsive"
                width={700}
                height={600}
                className="object-cover transform scale-95 transition-transform duration-700 ease-in-out"
              />
            </div>
            <Button
              type="text"
              icon={<RightOutlined />}
              onClick={showNextImage}
              className="absolute top-1/2 right-[-20px] transform -translate-y-1/2 text-black hover:text-primary transition-colors"
              style={{ fontSize: "24px" }}
            />
          </div>
        )}
      </Modal>
    </main>
  );
}
