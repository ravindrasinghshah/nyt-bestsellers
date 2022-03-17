
import { useState } from 'react';
import { FiExternalLink, FiShare } from 'react-icons/fi';

export default function Share() {
    const [show, setShow] = useState(false);
    const showModal = () => { setShow(true); }
    const hideModal = () => { setShow(false); }
    const showHideClassName = show ? style.show : style.hide;

    return (
        <>
            <button onClick={showModal} className={style.button}>
                <FiShare className="mr-1" />Share</button>
            <div className={showHideClassName}>
                <section className="modal-main">
                    Modal text
                    <button type="button" onClick={hideModal}>
                        Close
                    </button>
                </section>
            </div>
        </>
    )
}

const style = {
    show: `modal display-block`,
    hide: `modal display-none`,
    button: `flex flex-row items-center hover:underline font-semibold`
}
