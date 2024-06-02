import { useState } from "react"
import { BaseResultType, baseApi } from "../../api/base-api"
import { Button, Form, FormProps, Input, InputNumber, Modal, Popconfirm, PopconfirmProps, message } from "antd"
import { useDeepCompareEffect } from "ahooks"
import { TicketsParamsType, ticketsApi } from "../../api/ticket-api"
import { useUserInfo } from "../../hooks/useUserInfo"

const UserPlace = () => {
    const [data, setData] = useState<BaseResultType.UsableplacesType[]>([
        {
            "contact": "1008685",
            "id": 1,
            "name": "xx篮球场1号",
            "ogid": 2,
            "racetype": "篮球",
            "status": "可出租"
        },
        {
            "contact": "1008685",
            "id": 2,
            "name": "xx篮球场2号",
            "ogid": 2,
            "racetype": "篮球",
            "status": "可出租"
        }
    ])
    const fetchData = async () => {
        try {
            const res = await baseApi.usableplaces({})
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
        fetchData()
    }, [])

    return <div>
        {
            data.map((val, idx) => {
                return (
                    <div key={val.id} style={{ display: 'flex', color: '#fff', backgroundColor: '#000', justifyContent: 'space-evenly', margin: '0 120px 30px 120px', alignItems: 'center', padding: '30px 0' }}>
                        <div>
                            <p style={{ fontSize: '26px', color: 'red' }}>场地名称: {val.name}</p>
                            <p style={{ fontSize: '22px' }}>场地类型: {val.racetype}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ fontSize: '32px' }}>{val.status}</p>
                            <p style={{ fontSize: '22px' }}>联系方式：{val.contact}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
}

export default UserPlace