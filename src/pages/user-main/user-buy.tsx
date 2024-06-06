import { useState } from "react"
import { BaseResultType, baseApi } from "../../api/base-api"
import { Button, Collapse, CollapseProps, Form, FormProps, Input, InputNumber, Modal, Popconfirm, PopconfirmProps, message } from "antd"
import { useDeepCompareEffect } from "ahooks"
import { TicketsParamsType, ticketsApi } from "../../api/ticket-api"
import { useUserInfo } from "../../hooks/useUserInfo"

const UserBuy = () => {
    const [data, setData] = useState<BaseResultType.UserticketshisType[]>([
        {
            "buytime": "2024-05-29 00:08:43",
            "count": 2,
            "id": 4,
            "name": "湖人VS勇士季后赛",
            "price": 19.9,
            "tid": 2,
            "uid": 1
        },
        {
            "buytime": "2024-05-29 00:08:43",
            "count": 3,
            "id": 6,
            "name": "湖人VS勇士常规赛",
            "price": 122,
            "tid": 3,
            "uid": 1
        }
    ])

    const [goodsData, setGoodsData] = useState<BaseResultType.UsergoodshisType[]>([
        {
            "boughttime": "2024-05-26 22:08:26",
            "cost": "499.90",
            "count": 1,
            "gid": 2,
            "id": 1,
            "image": "/static/image/ogmanager/a.png",
            "name": "湖人队23号球衣",
            "uid": 1
        },
        {
            "boughttime": "2024-05-26 22:08:26",
            "cost": "199.80",
            "count": 1,
            "gid": 3,
            "id": 2,
            "image": "/static/image/maozi/a.png",
            "name": "联名棒球帽",
            "uid": 1
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.userticketshis({
                userid: getUserInfo('userInfo').id
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

    const fetchGoodsData = async () => {
        try {
            const res = await baseApi.usergoodshis({
                userid: getUserInfo('userInfo').id
            })
            if (res.code === 200) {
                if (res.data) {
                    setGoodsData(res.data)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useDeepCompareEffect(() => {
        fetchData()
        fetchGoodsData()
    }, [])

    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const { getUserInfo } = useUserInfo()

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '购票记录',
            children: <>
                {
                    data.map((val, idx) => {
                        return (
                            <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
                                <div>
                                    <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.price}</p>
                                    <p style={{ fontSize: '22px' }}>购买数量：{val.count}张</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ fontSize: '32px' }}>{val.name}</p>
                                    <p style={{ fontSize: '22px' }}>{val.buytime}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </>,
        },
        {
            key: '2',
            label: '周边记录',
            children: <>
                {
                    goodsData.map((val, idx) => {
                        return (
                            <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
                                <div className="img">
                                    <img src={val.image} alt="" />
                                </div>

                                <div>
                                    <p style={{ fontSize: '26px', color: 'red' }}>¥ {val.cost}</p>
                                    <p style={{ fontSize: '22px' }}>购买数量：{val.count}</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <p style={{ fontSize: '32px' }}>{val.name}</p>
                                    <p style={{ fontSize: '22px' }}>{val.boughttime}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </>,
        },
    ];

    return <div>
        <Collapse items={items} defaultActiveKey={['1', '2']} onChange={onChange} />
    </div>
}

export default UserBuy