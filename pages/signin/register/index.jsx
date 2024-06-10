import { TextInput, PasswordInput, Group, FileInput, Button, Checkbox, Flex, rem, RadioGroup, Radio, Select } from "@mantine/core"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useForm } from "@mantine/form"

export default function Register() {
    let router = useRouter()
    let [gender, setGender] = useState('ذكر')
    let [submit, setSubmit] = useState(false)
    let [verify, setVerify] = useState(false)
    let verifyForm = useForm({
        initialValues:{
            number:''
        },
        validate:{
            number:(value)=>(/^\d+$/.test(value)&&value.length==6?null:'يجب إدخال عدد مكون من ستة أرقام')
        }
    })
    let registerForm = useForm({
        initialValues: {
            name: '',
            phoneOrEmail: '',
            password: '',
            gender: 'ذكر',
            profileImage: '',
            acceptCookies: false
        },
        validate: {
            name: (value) => (/^[A-Za-z\u0600-\u06FF\s]*$/.test(value) ? null : "لا يمكن استخدام سوي الحروف العربية أو الإنجليزية في حقل الاسم"),
            phoneOrEmail: (value) => ((/^\S+@\S+$/.test(value) || (/^\d+$/.test(value) && value.length == 12)) ? null : 'رقم المحمول أو البريد الالكتروني غير سليم'),
            acceptCookies: (value) => (value ? null : 'يجب تفعيل هذا الحقل لإنشاء حساب')
        }
    })
    useEffect(() => {
        async function submitForm() {
            let formData = new FormData()
            if(!verify){
                for (const key in registerForm.values) {
                    if(key!=='acceptCookies'){
                        formData.append(key, registerForm.values[key]);
                    }
                }
                let sessionIDs = []
                formData.append('sessionIDs',JSON.stringify(sessionIDs))
                let res = await fetch('/api/register', {
                    method: 'POST', mode: 'cors',
                    body: formData
                })
                let resModified = await res.json()
                if (resModified.redirect) {
                    setVerify(true)
                }
                else if (!resModified.valid) {
                    registerForm.setFieldError('phoneOrEmail', 'الرقم أو البريد الإلكتروني غير صحيح')
                }
                else if (resModified.accountExists) {
                    registerForm.setFieldError('phoneOrEmail', 'الرقم أو البريد الإلكتروني مسجل عليه حساب بالفعل')
                }
                console.log(resModified);
                console.log(registerForm.values)
            }
            else {
                let res = await fetch('/api/verify', {
                    method: 'POST', mode: 'cors',headers:{
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({number:verifyForm.values['number'],phoneorEmail:registerForm.values['phoneOrEmail']})
                })
                console.log({number:verifyForm.values['number']});
                let resModified = await res.json()
                console.log(resModified);
            }
            setSubmit(false)
        }
        console.log(submit);

        if (submit) {
            submitForm()
        }
    }, [submit])
    return <div style={{ width: '100vw', display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'center' }}>
        <form style={{ display: verify ? 'none' : 'block' }} onSubmit={registerForm.onSubmit(() => { setSubmit(true) })} action="submit">
            <Flex style={{ display: 'block', width: '30vw', color: 'var(--grey)' }} mb={rem(32)}>
                <TextInput {...registerForm.getInputProps('name')} label='الاسم' required></TextInput>
                <TextInput {...registerForm.getInputProps('phoneOrEmail')} label='رقم الهاتف أو البريد الإلكتروني' required></TextInput>
                <PasswordInput {...registerForm.getInputProps('password')} label='كلمة المرور' required></PasswordInput>
                <FileInput label='صورة الحساب' placeholder='اختر صورة توحي بالمهنية' {...registerForm.getInputProps('profileImage')}></FileInput>
                <RadioGroup my={rem(16)}
                    label="الجنس"
                    value={gender}
                    onChange={() => { if (gender === 'ذكر') { setGender('أنثي') } else { setGender('ذكر') } }}
                    {...registerForm.getInputProps('gender')}
                    required
                >
                    <Radio color="var(--normalblue)" value={'ذكر'} label="ذكر" />
                    <Radio color="var(--normalblue)" value={'أنثي'} label="أنثي" />
                </RadioGroup>
                <Checkbox color="var(--normalblue)" my={rem(16)} label='السماح بتخزين ملفات تعريف الارتباط cookies لتحسين تجربة المستخدم و لاستمرار تسجيل الدخول' {...registerForm.getInputProps('acceptCookies')}></Checkbox>
                <div><span style={{ color: 'var(--grey)', textDecorationLine: 'underline' }} onClick={() => { router.push('/signin') }}> لدي حساب بالفعل    </span></div>
                <Group mt={rem(16)}>
                    <Button style={{ backgroundColor: 'var(--normalblue)' }} type="submit">إنشاء حساب</Button>
                </Group>
            </Flex>
        </form>
        <form style={{ display: !verify ? 'none' : 'block' }} onSubmit={verifyForm.onSubmit(() => { setSubmit(true) })} action="submit">
        <TextInput {...verifyForm.getInputProps('number')} label='كود التحقق' required></TextInput>
            <Group mt={rem(16)}>
                <Button style={{ backgroundColor: 'var(--normalblue)' }} type="submit">التحقق </Button>
            </Group>
        </form>
    </div>
}
