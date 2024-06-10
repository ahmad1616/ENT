import { Group, TextInput, Flex,Button, rem, Box } from "@mantine/core"
import { useForm } from "@mantine/form"
export default function Book() {
    return <>
        <div id="bookFlex" style={{ display: 'flex',width:'100vw',height:'80vh',alignItems:"center",justifyContent:'space-evenly' }}>
            <Box>
                <form action="submit">
                <Flex direction={'column'}>
                    <TextInput label='التخصص'></TextInput>
                    <TextInput label='الطبيب'></TextInput>
                    <TextInput label='التاريخ'></TextInput>
                    <Group mt={rem(16)}>
                    <Button type="submit">حجز</Button>
                    </Group>
                </Flex>
                </form>
            </Box>
            <iframe id="centerMap"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.828927271752!2d30.92076692491816!3d29.955598974968446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145855798b14cb1d%3A0x9c76f1ec90dd08dd!2sCapital%20ENT%20Center!5e0!3m2!1sar!2seg!4v1712056992668!5m2!1sar!2seg"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
            />

        </div>
    </>
}