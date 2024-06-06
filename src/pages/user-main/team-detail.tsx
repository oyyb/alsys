import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import ReactHtmlParser from 'html-react-parser';
import { BaseResultType, baseApi } from '../../api/base-api';

const TeamDetail: React.FC = () => {
    let params = useParams()

    const [data, setData] = useState<BaseResultType.TeaminfoType>({
        "players": [
            {
                "id": 1,
                "Name": "姚明",
                "Age": 0,
                "Sex": "男",
                "Height": 210.2,
                "Weight": 180.9,
                "Image": "/static/image/players/a.png",
                "Teamid": 1
            },
            {
                "id": 1,
                "Name": "姚明",
                "Age": 0,
                "Sex": "男",
                "Height": 210.2,
                "Weight": 180.9,
                "Image": "/static/image/players/a.png",
                "Teamid": 1
            },
            {
                "id": 1,
                "Name": "姚明",
                "Age": 0,
                "Sex": "男",
                "Height": 210.2,
                "Weight": 180.9,
                "Image": "/static/image/players/a.png",
                "Teamid": 1
            },
            {
                "id": 1,
                "Name": "姚明",
                "Age": 0,
                "Sex": "男",
                "Height": 210.2,
                "Weight": 180.9,
                "Image": "/static/image/players/a.png",
                "Teamid": 1
            }
        ],
        "racehis": [
            {
                "id": 1,
                "Ogmgid": 1,
                "Name": "湖人VS勇士",
                "Ogid": 1,
                "Placeid": 1,
                "Stime": "2024-09-09",
                "Status": "已结束",
                "Teamid1": 1,
                "Teamscore1": 12,
                "Teamid2": 1,
                "Teamscore2": 10
            },
            {
                "id": 1,
                "Ogmgid": 1,
                "Name": "湖人VS勇士",
                "Ogid": 1,
                "Placeid": 1,
                "Stime": "2024-09-09",
                "Status": "已结束",
                "Teamid1": 1,
                "Teamscore1": 12,
                "Teamid2": 1,
                "Teamscore2": 10
            },
            {
                "id": 1,
                "Ogmgid": 1,
                "Name": "湖人VS勇士",
                "Ogid": 1,
                "Placeid": 1,
                "Stime": "2024-09-09",
                "Status": "已结束",
                "Teamid1": 1,
                "Teamscore1": 12,
                "Teamid2": 1,
                "Teamscore2": 10
            },
            {
                "id": 1,
                "Ogmgid": 1,
                "Name": "湖人VS勇士",
                "Ogid": 1,
                "Placeid": 1,
                "Stime": "2024-09-09",
                "Status": "已结束",
                "Teamid1": 1,
                "Teamscore1": 12,
                "Teamid2": 1,
                "Teamscore2": 10
            }
        ],
        "team": {
            "id": 1,
            "image": "/static/image/ogmanager/a.png",
            "info": "美国洛杉矶湖人队，xxxxxx",
            "lose": 0,
            "name": "洛杉矶湖人队",
            "ogid": 1,
            "racetype": "篮球",
            "win": 12
        }
    })
    const fetchData = async () => {
        try {
            if (params.id) {
                const res = await baseApi.teaminfo({
                    teamid: params.id
                })
                if (res.code === 200) {
                    if (res.data) {
                        setData(res.data)
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className='img' style={{ width: '100px', height: '100px' }}>
                    <img src={data?.team.image} alt="" />
                </div>
                <p style={{ fontSize: '36px', fontWeight: 'bold', marginLeft: '20px' }}>{data?.team.name}</p>
            </div>

            <div style={{ margin: '20px 200px' }}>
                <p style={{ textAlign: 'center' }}>{data?.team.info}</p>
            </div>

            <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3,auto)', padding: '100px' }}>
                {
                    data?.players.map((val, idx) => {
                        return (
                            <div key={val.id}>
                                <div className='img' style={{ width: '100%', height: '400px' }}>
                                    <img src={val.Image} alt="" />
                                </div>

                                <p><span style={{ marginRight: '30px' }}>姓名：{val.Name}</span> <span style={{ marginRight: '30px' }}>性别：{val.Sex}</span><span>年龄：{val.Age}</span> </p>
                                <p><span style={{ marginRight: '30px' }}>身高：{val.Height}</span><span>体重：{val.Weight}</span> </p>
                            </div>
                        )
                    })
                }
            </div>

            <div>
                <p style={{ margin: '10px 100px', display: 'block', border: '1px solid #ccc', padding: '10px' }}>比赛记录</p>
                <div style={{ display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(3,auto)', padding: '100px' }}>
                    {
                        data?.racehis.map((val, idx) => {
                            return (
                                <div key={val.id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000',padding:'50px 0px' }}>
                                    <p style={{ fontSize: '28px', margin: '10px', color: '#fff' }}>{val.Name}</p>
                                    <p style={{ fontSize: '20px', color: 'red', margin: '10px' }}>{val.Teamscore1} : {val.Teamscore2}</p>
                                    <p style={{ color: '#fff' }}>{val.Stime} | {val.Status}</p>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    );
}

export default TeamDetail;