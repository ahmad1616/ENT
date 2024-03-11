import Book from ".";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../../src/components/loading";
export default function Doctor() {
    let [landLoading, setLandLoading] = useState(true)
    let [table, setTable] = useState([])
    let [doctorData, setDoctorData] = useState({ name: '', image: '', table: {},introduction:'' })
    let [doctorLoading, setDoctorLoading] = useState(false)
    let [doctorsClicked, setDoctorsClicked] = useState([])
    let [doctors, setDoctors] = useState([])
    let [doctorProfile,setDoctorProfile] = useState(0)
    let router = useRouter();
    useEffect(() => {
        async function asyncGetDoctors() {
            if (landLoading) {
                console.log(router.query);
                let res = await fetch('/api/doctors', {
                    method: 'POST', mode: 'cors', headers: {
                        'Content-Type': 'application/json',
                        'job': 'getDoctors'
                    },
                    body: JSON.stringify(router.query)
                })
                let res2 = await res.json()
                setDoctors(res2.doctors)
                let doctorsClicked = Array(res2.doctors.length)
                for (let i = 0; i < doctorsClicked.length; i++) {
                    doctorsClicked[i] = false
                }
                setDoctorsClicked(doctorsClicked)
                setLandLoading(false)
            }
            if (doctorsClicked.includes(true)) {

                let doctorName = doctors[doctorsClicked.indexOf(true)]['name']
                let res = await fetch('/api/doctors', {
                    method: 'POST', mode: 'cors', headers: {
                        'Content-Type': 'application/json',
                        'job': 'getDoctor'
                    },
                    body: JSON.stringify({ name: doctorName })
                })
                let res2 = await res.json()
                let arr = []
                for (const [key, value] of Object.entries(res2.doctor.table)) {
                    arr.push(`${key} ${value}`)
                }
                setTable(arr)
                console.log(res2);
                setDoctorData(res2.doctor)
                setDoctorLoading(false)
            }
        }
        asyncGetDoctors()
    }, [doctorsClicked])
    function handleDoctorsClick(event) {
        setDoctorData({ name: '', image: '',table:{},introduction:'' })
        let key = event.target.getAttribute('a-key')
        console.log(event.target);
        
        let doctorsClickedArbitrary = []
        if (doctorsClicked[key] == true) {
            for (let i = 0; i < doctorsClicked.length; i++) {
                doctorsClickedArbitrary.push(false);
                setDoctorLoading(false)
            }
        }
        else {
            for (let i = 0; i < doctorsClicked.length; i++) {
                if (i == key) {
                    doctorsClickedArbitrary.push(true)
                    setDoctorLoading(true)
                } else {
                    doctorsClickedArbitrary.push(false)
                }
            }
        }
        setDoctorsClicked(doctorsClickedArbitrary)
    }
    function onSubmit(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        let date = formData.get('reservationDate')
        let query = router.query
        query['name'] = doctorData['name']
        query['date'] = `${date}`
        router.push({ pathname: '/book/sign', query: query })
    }
    return (
        <div>
            <Loading loading={landLoading} />
            <div style={{ height: '89vh', display: landLoading ? 'none' : 'block' }}>
                <div style={{ position: 'fixed', top: '11.5vh', width: '25vw', height: '100%', backgroundColor: 'white' }}>
                    <h1 style={{ margin: '5%', color: 'var(--normalblue)' }}>الأطباء</h1>
                    <hr style={{ border: 'var(--grey) solid 1px', width: '95%' }}></hr>
                    <h3 style={{ color: 'var(--grey)', marginRight: '5%' }}>{doctors.length} طبيبا</h3>
                    {doctors.map((val, index) =>
                        <div a-key={index} onClick={handleDoctorsClick} className="doctorName" style={{ backgroundColor: doctorsClicked[index] ? 'var(--lightyellow)' : 'white', padding: '1vh 1vh', boxSizing: 'border-box', transition: 'background 0.5s', width: '95%', marginRight: '2.5%', borderRadius: '12px', color: 'var(--grey)', fontSize: 'var(--fontSize1)', display: 'flex', alignItems: 'center' }}>
                            <img src={val['image']} style={{ width: '6vh', height: '6vh', margin: '0 5%', borderRadius: '50%' }} />
                            {val['name']}</div>)}
                </div>
                <div style={{ width: '75vw', height: '100%', marginRight: '25vw', display: !doctorLoading && doctorData.name === '' ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center' }}>
                    <img src="/images/noone.svg" style={{ width: '25vh', height: '25vh', marginTop: '20vh' }} alt="" />
                    <span style={{ color: 'var(--grey)' }}>اختر الطبيب لإظهار معلوماته</span>
                </div>
                <Loading loading={doctorLoading} />
                <div style={{ display: doctorData.name != '' ? 'flex' : 'none', width: '74vw', marginRight: '25.5vw', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', width: '100%', height: '40vh', alignItems: 'center', justifyContent: 'space-evenly',backgroundColor:'white' }}>
                        <form onSubmit={onSubmit}>
                            <label htmlFor="reservationDate">موعد الحجز :
                                <select name='reservationDate' id="reservationDate">
                                    {table.map((val) => <option>{val}</option>)}
                                </select>
                            </label>
                            <button type="submit">التالي</button>
                        </form>
                        <img src={doctorData.image} style={{border:'var(--normalblue) solid 8px', borderRadius: "300px", width: '15vw', height: '15vw' }} />
                    </div>
                    <hr style={{ border: 'var(--grey) solid 1px', width: '100%',backgroundColor:'white',margin:0 }}></hr>
                    <div style={{ display: 'flex', flexDirection: 'row',marginBottom:'5px',backgroundColor:'white',padding:'0 2vw',boxSizing:'border-box' }}>
                        <h3 onClick={()=>{setDoctorProfile(0)}} style={{color:'var(--normalblue)',fontSize:'var(--fontSize2)',marginLeft:'2vw'}}>حول</h3>
                        <h3 onClick={()=>{setDoctorProfile(1)}} style={{color:'var(--normalblue)',fontSize:'var(--fontSize2)'}}>التواصل</h3>
                    </div>
                    <div style={{display:'flex',flexDirection:'row',width:'150vw'}}>
                        <div style={{position:'relative',right:!doctorProfile?0:'-75vw',width:'74vw',color:'var(--grey)',background:'white',fontSize:'var(--fontSize1)',padding:'2vh 1vw',boxSizing:'border-box'}}>
                            {doctorData.introduction}
                        </div>
                        <div style={{width:'50%',position:'relative',right:!doctorProfile?0:'-75vw'}}>
                            hi I am here  I would like to help in any thing
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}

Doctor.getLayout = Book.getLayout