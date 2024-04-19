import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import api from '@/api';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';

import { useAuth } from './AuthProvider';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const SignInForm = () => {
  const { setToken } = useAuth();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: 'demo@demo.com',
      password: 'demodemo',
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signin', data);
      setToken(response.data.accessToken);
    } catch (error) {
      setError('root', {
        message: error.response.data.message,
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center'>Sign In</h2>
        <p className='text-center text-muted-foreground'>
          Sign in using your email and password
        </p>

        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input {...register('password')} type='password' />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>

          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
