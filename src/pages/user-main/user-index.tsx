const UserIndex = () => {
    return <div>
        <div style={{ backgroundImage: 'url(/banner-bg.jpg)', display: 'flex', padding: '40px 20px' }}>
            <div style={{ width: '50%', height: 'auto' }}>

            </div>
            <div className="img" style={{ width: '50%' }}>
                <img src="/banner-img.png" alt="" />
            </div>
        </div>

        <div style={{ display: 'flex', marginTop: '100px', justifyContent: 'center' }}>
            <div className="img" style={{ width: '50%', padding: '0 80px' }}>
                <img src="/about.jpg" alt="" />
            </div>

            <div style={{ width: '50%', padding: '0 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{fontSize:'32px'}}>关于足球</p>
                <p>以快乐为导向的积极目标比以恐惧为导向的消极目标更有动力。虽然两者单独取得成功，但两者的正确结合是人类所知的最强大的动力。</p>
                <p>给自己负责任的力量。提醒自己，唯一能阻止你的就是你自己。</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '24px', color: '#fff',marginTop:'50px' }}>
                    <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                        <p>Games</p>
                        <p style={{ fontSize: '26px' }}>200<span style={{ fontSize: '16px', color: 'red' }}>+</span></p>
                    </div>

                    <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                        <p>Goals</p>
                        <p style={{ fontSize: '26px' }}>179<span style={{ fontSize: '16px', color: 'red' }}>+</span></p>
                    </div>

                    <div style={{ textAlign: 'center', backgroundColor: 'black' }}>
                        <p>Assist</p>
                        <p style={{ fontSize: '26px' }}>146<span style={{ fontSize: '16px', color: 'red' }}>+</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default UserIndex