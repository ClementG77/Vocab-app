'use client';

import { SafeUser, SafeWord } from "@/app/types";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from "../Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { test } from "node:test";

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
            return console.log("Correct")     
        }
        toast.error(`The correct traduction of ` +  testWord + ` was ` + correctTraduction )
        router.refresh();
        console.log('Hello')
    
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