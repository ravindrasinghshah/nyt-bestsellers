
import { useState } from 'react';
import { FiShare } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { IoCopyOutline } from 'react-icons/io5';
import { AppShareTitle } from '../common/config';
import {
    EmailShareButton,
    FacebookShareButton, FacebookIcon,
    FacebookMessengerShareButton, FacebookMessengerIcon,
    LinkedinShareButton, LinkedinIcon,
    TelegramShareButton, TelegramIcon,
    WhatsappShareButton, WhatsappIcon,
    TwitterShareButton, TwitterIcon
} from "react-share";

export default function Share() {
    const [show, setShow] = useState(false);
    const showModal = () => { setShow(true); }
    const hideModal = () => { setShow(false); }
    const showHideClassName = show ? style.show : style.hide;
    const bookRoute = window.location.href;

    return (
        <>
            <button onClick={showModal} className={style.share}>
                <FiShare className="mr-1" />Share
            </button>
            <div className={`${style.wrapper} ${showHideClassName}`}>
                <div className={style.body}>
                    <div className={style.content}>
                        <h1 className='font-semibold text-2xl pb-6'>Share this book</h1>
                        <div className={style.shareButtonWrapper}>
                            <button className={style.shareButton}
                                onClick={navigator.clipboard.writeText(bookRoute)}>
                                <div className={style.shareButtonContent}>
                                    <IoCopyOutline className="mr-3 rounded-md" />
                                    <span>Copy Link</span>
                                </div>
                            </button>
                            <button className={style.shareButton}>
                                <EmailShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    body={AppShareTitle}
                                    subject="NYT Best Seller Book - ">
                                    <div className={style.shareButtonContent}>
                                        <AiOutlineMail className='mr-3 text-[32px] font-thin' />
                                        <span> Email</span>
                                    </div>
                                </EmailShareButton>
                            </button>
                        </div>

                        <div className={style.shareButtonWrapper}>
                            <button className={style.shareButton}>
                                <FacebookShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    quote={AppShareTitle}>
                                    <div className={style.shareButtonContent}>
                                        <FacebookIcon size={32} className="mr-3 rounded-md" />
                                        <span> Facebook</span>
                                    </div>
                                </FacebookShareButton>
                            </button>
                            <button className={style.shareButton}>
                                <FacebookMessengerShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    title={AppShareTitle}
                                    separator=" ">
                                    <div className={style.shareButtonContent}>
                                        <FacebookMessengerIcon size={32} className="mr-3 rounded-md" />
                                        <span>Messenger </span>
                                    </div>
                                </FacebookMessengerShareButton>
                            </button>
                        </div>
                        <div className={style.shareButtonWrapper}>
                            <button className={style.shareButton}>
                                <WhatsappShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    title={AppShareTitle}
                                    separator=" ">
                                    <div className={style.shareButtonContent}>
                                        <WhatsappIcon size={32} className="mr-3 rounded-md" />
                                        <span>WhatsApp</span>
                                    </div>
                                </WhatsappShareButton>
                            </button>
                            <button className={style.shareButton}>
                                <LinkedinShareButton
                                    className='w-full h-full'
                                    url={bookRoute}>
                                    <div className={style.shareButtonContent}>
                                        <LinkedinIcon size={32} className="mr-3 rounded-md" />
                                        <span>LinkedIn</span>
                                    </div>
                                </LinkedinShareButton>
                            </button>
                        </div>
                        <div className={style.shareButtonWrapper}>
                            <button className={style.shareButton}>
                                <TwitterShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    title={AppShareTitle}>
                                    <div className={style.shareButtonContent}>
                                        <TwitterIcon size={32} className="mr-3 rounded-md" />
                                        <span>Twitter</span>
                                    </div>
                                </TwitterShareButton>
                            </button>
                            <button className={style.shareButton}>
                                <TelegramShareButton
                                    className='w-full h-full'
                                    url={bookRoute}
                                    title={AppShareTitle}>
                                    <div className={style.shareButtonContent}>
                                        <TelegramIcon size={32} className="mr-3 rounded-md" />
                                        <span>Telegram</span>
                                    </div>
                                </TelegramShareButton>
                            </button>
                        </div>
                    </div>
                    <div className={style.action}>
                        <button type="button" onClick={hideModal}>
                            Close
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

const style = {
    wrapper: `flex items-center justify-center min-h-screen text-center sm:p-0`,
    show: `modal display-block`,
    hide: `modal display-none`,
    body: `align-bottom bg-white inline-block overflow-hidden relative rounded-lg shadow-xl sm:align-middle sm:max-w-lg sm:my-8 sm:w-full text-left transform transition-all`,
    content: `bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4`,
    action: `bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse hover:underline`,
    share: `flex flex-row items-center hover:underline font-semibold`,
    shareButtonWrapper: `flex flex-row justify-start items-center space-x-5`,
    shareButton: `border w-1/2 rounded text-base font-normal h-16 mb-5 hover:bg-gray-100`,
    shareButtonContent: `flex flex-row items-center justify-start ml-5`
}
