import Book from "."
import { useRouter } from "next/router"
import { useState } from "react"
import { Select, Flex, Group, Button, NativeSelect } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Center() {
    let centers = ['مركز السادس من أكتوبر', 'مركز المهندسين']
    let form = useForm({
        initialValues:{
            center:'مركز السادس من أكتوبر',
            specialization:'الأنف و الأذن و الحنجرة',
        }
    })
    function onSubmit(event) {
        event.preventDefault();
        let center = form.values.center
        let specialization = form.values.specialization
        router.push({ pathname: '/book/choosedoctor', query: { center: center, specialization: specialization } })
    }
    let onChange = function (event){setCentersOption(centers.indexOf(event.currentTarget.value))
        console.log(centers.indexOf(event.currentTarget.value));
        form.setFieldValue('center',event.currentTarget.value)
        }
    let maps = ["https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1543.8702106193662!2d30.918191999999998!3d29.955599000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145855798b14cb1d%3A0x9c76f1ec90dd08dd!2sCapital%20ENT%20Center!5e1!3m2!1sar!2seg!4v1707619271096!5m2!1sar!2seg",
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d49357.175990264106!2d31.204059!3d30.049383!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584131cac08c7d%3A0xbd00be7b9494a8f4!2z2KfZhNmF2YfZhtiv2LPZitmG4oCO2Iwg2YXYrdin2YHYuNipINin2YTYrNmK2LLYqQ!5e1!3m2!1sar!2seg!4v1707619369564!5m2!1sar!2seg"]
    let [centersOption, setCentersOption] = useState(0)
    let router = useRouter()
    return <div id="choosecenter" dir="ltr" style={{ display: 'flex', height: '80vh', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <iframe src={maps[centersOption]} style={{ width:'25rem',height:'20rem',border: '4px solid var(--normalblue)' }} allowFullScreen={false} loading={"lazy"} referrerPolicy={"no-referrer-when-downgrade"}></iframe>   
        <form onSubmit={onSubmit}>
        <Flex direction={'column'}>
            <NativeSelect
                w={300}
                m={10}
                data={centers} 
                onChange={onChange}
            />
            <NativeSelect
                w={300}
                m={10}
                data={['الأنف و الأذن و الحنجرة', 'السمعيات', 'التخاطب']}
                {...form.getInputProps('specialization')}
            />
            <Group m={10}>
                <Button color="var(--normalblue)" type="submit">التالي</Button>
            </Group>
        </Flex>
        </form>
        
    </div>
}

Center.getLayout = Book.getLayout
