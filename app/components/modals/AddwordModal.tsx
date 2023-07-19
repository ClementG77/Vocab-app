'use client';

import useAddwordModal from '@/app/hooks/useAddwordModal';
import Modal from './Modal'
import { useMemo, useState } from 'react';
import { categories } from '../navbar/Categories';
import  useCountries from "@/app/hooks/useCountries";
import Heading from '../Heading';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../inputs/Input';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import getWord from '@/app/actions/getWordByWord';


enum STEPS {
    LANG = 0,
    WORD = 1,
    TRADUCTION = 2,
}

const AddwordModal = () => {
    const addwordModal = useAddwordModal();
    const router = useRouter();
    const { getByName } = useCountries();

    const [step, setStep] = useState(STEPS.LANG);
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register, 
        handleSubmit,
        setValue,
        watch,
        formState: {
          errors,
        },
        reset,
      } = useForm<FieldValues>({
        defaultValues: {
          Lang: '',
          word: '',
          Traduction: '',
        }
      });

    const LANG = watch('LANG');
    const WORD = watch('WORD');
    const TRADUCTION = watch('TRADUCTION');


    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
      }

      const onBack = () => {
        setStep((value) => value - 1);
      }
    
      const onNext = () => {
        setStep((value) => value + 1);
      }

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.TRADUCTION) {
          return onNext();
        }
        
        
        setIsLoading(true);
  
        axios.post('/api/addwords', data)
        .then(() => {
          toast.success('Word succesfuly added to your list!');
          router.refresh();
          reset();
          setStep(STEPS.LANG)
          addwordModal.onClose();
        })
        .catch(() => {
          toast.error('Something went wrong.');
        })
        .finally(() => {
          setIsLoading(false);
        })
      }

      

    const actionLabel = useMemo(()=> {
        if (step === STEPS.TRADUCTION) {
            return 'Create';
        }
        return 'Next';
    },[step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LANG) {
            return undefined;
        }
        return 'Back';
    },[step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading
            title="Which Languages do you want to choose ?"
            subtitle="Pick a category"
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-2 
              gap-3
              max-h-[50vh]
              overflow-y-auto
            "
          >
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                onClick={(category) => { setCustomValue('Lang', category); setCustomValue('LANG', category);}}
                  selected={LANG === item.label}
                  label={item.label}
                  icon={(getByName(item.icon)?.flag)?.toString()}
                />
              </div>
            ))}
          </div>
        </div>
      )
    
      if (step === STEPS.WORD) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Enter your word"
              subtitle="fdsf"
            />
            <Input
              id="word"
              label="Word"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }

      if (step === STEPS.TRADUCTION) {
        bodyContent = (
          <div className="flex flex-col gap-8">
            <Heading
              title="Enter your Traduction"
              subtitle="gfdgfdgfd"
            />
            <Input
              id="Traduction"
              label="Traduction"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
          </div>
        )
      }
    
    return ( 
        <Modal
        isOpen={addwordModal.isOpen}
        onClose={addwordModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LANG ? undefined : onBack}
        title='Add your word'
        body={bodyContent}
        />
     );
}
 
export default AddwordModal;