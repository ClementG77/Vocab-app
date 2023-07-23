'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from "../Button";
import {VscError} from 'react-icons/vsc'
import error_icon from '@/public/images/error_icon.svg';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface QuizzProps {
    testWord: string;
    currentUser?: SafeUser | null;
    correctTraduction: string;
}

type FormValues = {
    word : string
    Traduction: string
  }

const Quizz: React.FC<QuizzProps> = ({
    testWord,
    correctTraduction,
    currentUser
}) => {

    const router = useRouter();


    const { 
        register, 
        handleSubmit,
        setValue,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
            word:'',
            Traduction:''
        }
      });
      const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        //const retreiveWord = getWord({ userId: currentUser?.id,word: correctWord });
        if (correctTraduction === data.Traduction) {
            toast.success("Correct")
            router.refresh();
            return  
        }
        toast.custom(<div className="
        w-auto
        h-auto
        flex
        flex-row
        align-center
        justify-center
        h-18
        p-2
        rounded-md
        bg-neutral-200
        "><div className="
        align-items">
            <VscError size={30}
                    color="red" />
            </div>
            <div className="align-items">
            The correct traduction of  <span className="font-bold">{testWord}</span>  was  <span className="font-bold">{correctTraduction}</span>
            </div>
        </div>,{duration:2000});
        //toast.error(`The correct traduction of ` +  JSON.stringify(<span className="font-bold">{testWord}</span>) + ` was ` + correctTraduction )
        router.refresh();
    
    }





    return (
        <div className="
            col-span-1 flex justify-center pt-8">
            <div className="
            gap-3
            flex
            flex-col
            p-6
            w-80
            h-80
            bg-neutral-100
            rounded-md
            ">
                <Heading
                title="Test your vocabulary"
                subtitle="What is the traduction of "
                center= {true} />

                <div className="
                flex
                h-full
                w-full
                justify-center
                items-top
                text-xl
                gap-2
                ">
                    {testWord}
                    
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                id="Traduction"
                label="Traduction"
                disabled={false}
                register={register}
                errors={errors}
                required
            />
            <div className="p-2"></div>
                <Button
                disabled={false}
                small={false}
                label={'Submit'} 
                onClick={()=>{}}
                />
                </form>
            </div>
        </div>
     );
}
 
export default Quizz;