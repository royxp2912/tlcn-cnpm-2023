'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoginValidation } from '@/lib/validation/user';
import { useForm } from 'react-hook-form';
import axios from '@/hooks/axios';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginValidation>>({
        mode: 'onBlur',
        resolver: zodResolver(LoginValidation),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
        console.log(values);
        try {
            const { data } = await axios.post('auth/login', {
                email: values.email,
                password: values.password,
            });
            console.log(data.data);
            localStorage.setItem('user', JSON.stringify(data.data));
            // router.push('/');
            console.log(data);
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-8 w-[380px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                    className=" focus:border-black border-input  focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-semibold">Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    className=" border-input focus:border-black focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <span className="font-semibold text-right cursor-pointer hover:opacity-80">Forgotten password?</span>
                <Button type="submit" className="w-full">
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

export default Login;
