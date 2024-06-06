import { Collapse, CollapseProps } from "antd"
import { useState } from "react";
import { BaseResultType, baseApi } from "../../api/base-api";
import { useDeepCompareEffect } from "ahooks";

const UserIndex = () => {
    // const [data, setData] = useState<BaseResultType.RaceunstartType[]>()

    const [items, setItems] = useState<CollapseProps['items']>()

    interface RaceType {
        ogid: string
    }
    const Race = (props: RaceType) => {
        const [data, setData] = useState<BaseResultType.RaceunstartType[]>([
            {
                "id": 2,
                "name": "湖人VS勇士常规赛",
                "ogid": 1,
                "ogmgid": 1,
                "placeid": 1,
                "status": "未开始",
                "stime": "2024-09-12",
                "team1image": "http://127.0.0.1:8081/images/hurendui.png",
                "team2image": "http://127.0.0.1:8081/images/yongshidui.jpg",
                "teamid1": 1,
                "teamid2": 2,
                "teamscore1": 1,
                "teamscore2": 1
            },
            {
                "id": 3,
                "name": "湖人VS勇士季后赛",
                "ogid": 1,
                "ogmgid": 1,
                "placeid": 1,
                "status": "未开始",
                "stime": "2024-09-14",
                "team1image": "http://127.0.0.1:8081/images/hurendui.png",
                "team2image": "http://127.0.0.1:8081/images/yongshidui.jpg",
                "teamid1": 1,
                "teamid2": 2,
                "teamscore1": 0,
                "teamscore2": 0
            }
        ])
        const fetchRaceData = async () => {
            try {
                const res = await baseApi.raceunstart({
                    ogid: props.ogid
                })
                if (res.code === 200) {
                    if (res.data) {
                        setData(res.data)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }

        useDeepCompareEffect(() => {
            fetchRaceData()
        }, [])
        return <>
            {
                data.map((val, idx) => {
                    return (
                        <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
                            {/* <div>
                                <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.price}</p>
                                <p style={{ fontSize: '22px' }}>购买数量：{val.count}张</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <p style={{ fontSize: '32px' }}>{val.name}</p>
                                <p style={{ fontSize: '22px' }}>{val.buytime}</p>
                            </div> */}
                        </div>
                    )
                })
            }
        </>
    }
    // const items: CollapseProps['items'] = [
    //     {
    //         key: '1',
    //         label: '购票记录',
    //         children: ,
    //     },
    //     {
    //         key: '2',
    //         label: '周边记录',
    //         children: <>
    //             {
    //                 goodsData.map((val, idx) => {
    //                     return (
    //                         <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
    //                             <div className="img">
    //                                 <img src={val.image} alt="" />
    //                             </div>

    //                             <div>
    //                                 <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.cost}</p>
    //                                 <p style={{ fontSize: '22px' }}>购买数量：{val.count}</p>
    //                             </div>

    //                             <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    //                                 <p style={{ fontSize: '32px' }}>{val.name}</p>
    //                                 <p style={{ fontSize: '22px' }}>{val.boughttime}</p>
    //                             </div>
    //                         </div>
    //                     )
    //                 })
    //             }
    //         </>,
    //     },
    // ];
    // const fe
    const fetchData = async () => {
        try {
            const res = await baseApi.getallogs({})
            if (res.code === 200) {
                if (res.data) {
                    const arr: CollapseProps['items'] = []
                    res.data.forEach((val, idx) => {
                        arr.push({
                            key: val.id,
                            label: val.Username,
                            children: <Race ogid={val.id.toString()}></Race>
                        })
                    })
                    setItems(arr)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useDeepCompareEffect(() => {
        fetchData()
    }, [])

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

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
                <p style={{ fontSize: '32px' }}>关于体育</p>
                <p>以快乐为导向的积极目标比以恐惧为导向的消极目标更有动力。虽然两者单独取得成功，但两者的正确结合是人类所知的最强大的动力。</p>
                <p>给自己负责任的力量。提醒自己，唯一能阻止你的就是你自己。</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,auto)', gap: '24px', color: '#fff', marginTop: '50px' }}>
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

        <div>
            <Collapse items={items} defaultActiveKey={['1', '2']} onChange={onChange} />
        </div>
    </div>
}

export default UserIndex