import { TextInput, PasswordInput, Group, FileInput, Button, Flex, Checkbox, rem, RadioGroup, Radio, Select } from "@mantine/core"
import { useState, useEffect, useContext } from "react"
import { useForm } from "@mantine/form"
import { useRouter } from "next/router"
import { SignedContext } from "../_app"
export default function SignIn() {
    let router = useRouter()
    let [submit, setSubmit] = useState(false)

    let signInForm = useForm({
        initialValues: {
            phoneOrEmail: '',
            password: '',
            acceptCookies: false
        },
        validate: {
            acceptCookies: (value) => (value ? null : 'يجب تفعيل هذا الحقل لإنشاء حساب')
        }
    })
    let { signedData, setSignedData } = useContext(SignedContext)
    useEffect(() => {
        async function submitForm() {
            let res = await fetch('/api/signin', {
                method: 'POST', mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                    },
                body: JSON.stringify({ phoneOrEmail: signInForm.values.phoneOrEmail, password: signInForm.values.password })
            })
            let resModified = await res.json()
            if (resModified.user == null) {
                signInForm.setFieldError('password', 'كلمة المرور قد تكون غير صحيحة')
                signInForm.setFieldError('phoneOrEmail', ' رقم المحمول أو البريد الإلكتروني قد يكون غير صحيح')
            }
            else {
                let user = resModified.user
                const date = new Date();
                date.setMonth(date.getMonth() + 1);
                const expires = date.toUTCString();
                let cookie = 'sessionID=' +user['sessionID'] + '; expires=' + expires + ';path=/'
                document.cookie = cookie
                console.log(document.cookie);
                setSignedData(user)
                router.push({ pathname: '/' })
            }

            setSubmit(false)

        }
        console.log(submit);

        if (submit) {
            submitForm()
        }
    }, [submit])
    return <div style={{ width: '100vw', display: 'flex', paddingTop: '5%', justifyContent: 'center' }}>
        <form onSubmit={signInForm.onSubmit(() => { setSubmit(true) })} action="submit">
            <Flex style={{ display: 'block', width: '30vw', color: 'var(--grey)' }} direction={'column'} mb={rem(32)}>
                <TextInput style={{ color: 'var(--grey)' }} label='رقم الهاتف أو البريد الإلكتروني'{...signInForm.getInputProps('phoneOrEmail')} required></TextInput>
                <PasswordInput style={{ color: 'var(--grey)' }} type="password" label='كلمة المرور' {...signInForm.getInputProps('password')} required></PasswordInput>
                <Checkbox my={rem(16)} color="var(--normalblue)" label='السماح بتخزين ملفات تعريف الارتباط cookies لتحسين تجربة المستخدم و لاستمرار تسجيل الدخول' {...signInForm.getInputProps('acceptCookies')}></Checkbox>
                <span style={{ color: 'var(--grey)', textDecorationLine: 'underline' }} onClick={() => { router.push('/signin/register') }}>ليس لدي حساب</span>
                <Group mt={rem(16)}>
                    <Button style={{ backgroundColor: 'var(--normalblue)' }} type="submit">تسجيل الدخول</Button>
                </Group>
            </Flex>
        </form>
    </div>
}   