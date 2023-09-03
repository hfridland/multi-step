import iconThankYou from './images/icon-thank-you.svg'

const Conclusion = () => {
    return (
        <article className="conclusion">
            <div className='content'>
                <img src={iconThankYou} alt='Thank you' />
                <h1 className='title'>Thank you!</h1>
                <p>
                    Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
                    please feel free to email us at support@loremgaming.com.
                </p>
            </div>
        </article>
    )
}

export default Conclusion