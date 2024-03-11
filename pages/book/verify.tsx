import Book from "."
import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Verify() {
    let router = useRouter()
    let [verificationNum, setVerificationNum] = useState('')
    let [submitNow, setSubmitNow] = useState(false)
    useEffect(() => {
        async function verify() {
            let res = await fetch('/api/verify', {
                method: 'POST', mode: 'cors', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({ verificationNum: verificationNum })
            })
            let res2 = await res.json()
            if(res2.verified){
                alert('verification succeeded')
                router.push('/')
            }
            else{
                alert('verification failed')
            }

        }
        if (submitNow) {
            if (verificationNum.length === 8) {
                verify()
                setSubmitNow(false)
            }
            else {
                console.log("can't submit");
            }
        }
    }, [submitNow])
    let form = useForm({
        initialValues: {
            verificationNum: ''
        }
    })
    return <> 
        <Box my={100} mx={'auto'} maw={340}>
            <form onSubmit={form.onSubmit(() => {
                console.log('hi');
                
                setVerificationNum(form.values.verificationNum)
                setSubmitNow(true) })}>
                <TextInput dir="ltr"
                    withAsterisk
                    label="الاسم"
                    placeholder="VERIFICATION NUMBER"
                    {...form.getInputProps('verificationNum')}
                />
                <Group justify="flex-end" mt="md">
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    </>
}

Verify.getLayout = Book.getLayout