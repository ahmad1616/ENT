import Book from "."
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
export default function Sign() {
    const [verifyType,setVerifyType] = useState('')
    let router = useRouter()
    useEffect(()=>{
        async function verificationMedium() {
            if(verifyType=='email'){
                let res = await fetch('/api/verificationEmail', {
                    method: 'POST', mode: 'cors', headers: {
                        'Content-Type': 'application/json',
                        'job': 'SEND'
                    },body: JSON.stringify({...form.values,...router.query})
                })
                let res2= await res.json()
                console.log(res2);
                
                if(res2.redirect){//we put the email in order to match the verifed with verifier
                    router.push({pathname:'/book/verify',query:{...form.values,...router.query}})
                }
                else{
                    form.setFieldError('phoneOrEmail',"email doesn't exist")
                }
            }
            else if(verifyType=='phone'){
                let res = await fetch('/api/verificationSMS', {
                    method: 'POST', mode: 'cors', headers: {
                        'Content-Type': 'application/json',
                    },body: JSON.stringify({...form.values,...router.query})
                })   
            }
        }
        verificationMedium()
        setVerifyType('')
    },[verifyType])
    const form = useForm({
        initialValues: {
            name: '',
            phoneOrEmail: '',
            symptoms: '',
            patientHistory: ''
        },
        validate: {
        }
    });
    return <>
        <Box my={100} mx={'auto'} maw={340}>
            <form onSubmit={form.onSubmit(()=>{if (form.values.phoneOrEmail.includes('@')) {
                setVerifyType('email')
            }else{setVerifyType('phone')}})}>
                <TextInput
                    withAsterisk
                    label="الاسم"
                    placeholder="أحمد وائل"
                    {...form.getInputProps('name')}
                />
                <TextInput dir="ltr"
                    withAsterisk
                    label="رقم الهاتف أو البريد الإلكتروني"
                    placeholder="your@email.com"
                    {...form.getInputProps('phoneOrEmail')}
                />
                <TextInput
                    withAsterisk
                    label="الأعراض"
                    placeholder="أعاني من بحة في الصوت"
                    {...form.getInputProps('symptoms')}
                />
                <TextInput
                    withAsterisk
                    label="التاريخ المرضي"
                    placeholder="أتابع مع طبيب باطنة من العام السابق"
                    {...form.getInputProps('patientHistory')}
                />

                <Group justify="flex-end" mt="md">
                    <Button color="#00B5C8" type="submit">Submit</Button>
                </Group>
            </form>
        </Box></>
}
Sign.getLayout = Book.getLayout