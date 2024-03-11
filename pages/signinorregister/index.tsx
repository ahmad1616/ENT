import { TextInput, Button, Group, Box } from '@mantine/core';
import { useForm } from "@mantine/form";
import Link from 'next/link';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignIn() {
    let [isSign, setIsSign] = useState(true)
    const form = useForm({
        initialValues: {
            password: '',
            phoneOrEmail: ''
        },
        validate: {
        }
    });
    return <>
        <Box my={100} mx={'auto'} maw={340}>
            <form style={{ display: isSign ? 'block' : 'none' }}>
                <TextInput dir="ltr"
                    withAsterisk
                    label="رقم الهاتف أو البريد الإلكتروني"
                    placeholder="your@email.com"
                    {...form.getInputProps('phoneOrEmail')}
                />
                <TextInput
                    withAsterisk
                    label="كلمة المرور"
                    placeholder='*********'
                    {...form.getInputProps('name')}
                />

                <Group justify="flex-end" mt="md">
                    <span onClick={() => { setIsSign(false) }} style={{ textDecorationLine: 'underline', color: 'black' }}>ليس لدي حساب</span><Button color="#00B5C8" type="submit">تسجيل الدخول</Button>
                </Group>
            </form>
            <form style={{ display: isSign ? 'none' : 'block' }}>
                <TextInput dir="ltr"
                    withAsterisk
                    label="الاسم"
                    placeholder="أحمد"
                    {...form.getInputProps('phoneOrEmail')}
                />
                <TextInput dir="ltr"
                    withAsterisk
                    label="رقم الهاتف أو البريد الإلكتروني"
                    placeholder="your@email.com"
                    {...form.getInputProps('phoneOrEmail')}
                />
                <TextInput
                    withAsterisk
                    label="كلمة المرور"
                    placeholder='*********'
                    {...form.getInputProps('name')}
                />
                <Group justify="flex-end" mt="md">
                    <span onClick={() => { setIsSign(true) }} style={{ textDecorationLine: 'underline', color: 'black' }}>لدي حساب بالفعل</span><Button color="#00B5C8" type="submit">إنشاء حساب</Button>
                </Group>
            </form>
        </Box></>
}