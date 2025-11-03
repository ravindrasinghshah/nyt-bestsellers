import { useState } from "react";
import { FiShare } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { AppShareTitle } from "../common/config";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Share() {
  const [show, setShow] = useState(false);
  const showModal = () => {
    setShow(true);
  };
  const hideModal = () => {
    setShow(false);
  };
  const showHideClassName = show ? style.show : style.hide;
  const bookRoute = window.location.href;
  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookRoute);
    toast.success("Link Copied", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  return (
    <>
      <button onClick={showModal} className={style.share}>
        <FiShare className="mr-1" />
        Share
      </button>
      <div className={`${style.wrapper} ${showHideClassName}`}>
        <div className={style.body}>
          <div className={style.content}>
            <h1 className="font-semibold text-2xl pb-6">Share this book</h1>
            <div className={style.shareButtonWrapper}>
              <button className={style.shareButton} onClick={handleCopyLink}>
                <div className={style.shareButtonContent}>
                  <IoCopyOutline className="mr-3 rounded-md" />
                  <span>Copy Link</span>
                </div>
              </button>
              <div className={style.shareButton}>
                <EmailShareButton
                  url={bookRoute}
                  body={AppShareTitle}
                  style={{}}
                  subject="NYT Best Seller Book - "
                >
                  <div className={style.shareButtonContent}>
                    <AiOutlineMail className="mr-3 text-[32px] font-thin" />
                    <span> Email</span>
                  </div>
                </EmailShareButton>
              </div>
            </div>

            <div className={style.shareButtonWrapper}>
              <div className={style.shareButton}>
                <FacebookShareButton
                  className={style.shareButton}
                  url={bookRoute}
                  quote={AppShareTitle}
                >
                  <div className={style.shareButtonContent}>
                    <FacebookIcon size={32} className="mr-3 rounded-md" />
                    <span>Facebook</span>
                  </div>
                </FacebookShareButton>
              </div>
              <div className={style.shareButton}>
                <FacebookMessengerShareButton
                  className={style.shareButton}
                  url={bookRoute}
                  title={AppShareTitle}
                  separator=" "
                >
                  <div className={style.shareButtonContent}>
                    <FacebookMessengerIcon
                      size={32}
                      className="mr-3 rounded-md"
                    />
                    <span>Messenger </span>
                  </div>
                </FacebookMessengerShareButton>
              </div>
            </div>
            <div className={style.shareButtonWrapper}>
              <div className={style.shareButton}>
                <WhatsappShareButton
                  className={style.shareButton}
                  url={bookRoute}
                  title={AppShareTitle}
                  separator=" "
                >
                  <div className={style.shareButtonContent}>
                    <WhatsappIcon size={32} className="mr-3 rounded-md" />
                    <span>WhatsApp</span>
                  </div>
                </WhatsappShareButton>
              </div>
              <div className={style.shareButton}>
                <LinkedinShareButton
                  className={style.shareButton}
                  url={bookRoute}
                >
                  <div className={style.shareButtonContent}>
                    <LinkedinIcon size={32} className="mr-3 rounded-md" />
                    <span>LinkedIn</span>
                  </div>
                </LinkedinShareButton>
              </div>
            </div>
            <div className={style.shareButtonWrapper}>
              <div className={style.shareButton}>
                <TwitterShareButton
                  className={style.shareButton}
                  url={bookRoute}
                  title={AppShareTitle}
                >
                  <div className={style.shareButtonContent}>
                    <TwitterIcon size={32} className="mr-3 rounded-md" />
                    <span>Twitter</span>
                  </div>
                </TwitterShareButton>
              </div>
              <div className={style.shareButton}>
                <TelegramShareButton
                  className={style.shareButton}
                  url={bookRoute}
                  title={AppShareTitle}
                >
                  <div className={style.shareButtonContent}>
                    <TelegramIcon size={32} className="mr-3 rounded-md" />
                    <span>Telegram</span>
                  </div>
                </TelegramShareButton>
              </div>
            </div>
          </div>
          <ToastContainer transition={Zoom} />
          <div className={style.action}>
            <button type="button" onClick={hideModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const style = {
  wrapper: `flex items-center justify-center min-h-screen text-center sm:p-0 z-[1000]`,
  show: `modal display-block`,
  hide: `modal display-none`,
  body: `align-bottom bg-white inline-block overflow-hidden relative rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all`,
  content: `bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4`,
  action: `bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse hover:underline`,
  share: `flex flex-row items-center hover:underline font-semibold`,
  shareButtonWrapper: `flex flex-col md:flex-row justify-start items-center space-x-0 md:space-x-5`,
  shareButton: `flex border w-full md:w-1/2 rounded text-base font-normal h-12 md:h-16 mb-3 md:mb-5 hover:bg-gray-100`,
  shareButtonContent: `flex flex-row items-center justify-start ml-5`,
};
