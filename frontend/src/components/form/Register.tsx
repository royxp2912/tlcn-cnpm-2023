'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RegisterValidation } from '@/lib/validation/user';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import axios from '@/hooks/axios';
import { useRouter } from 'next/navigation';

type data = {
    data: {
        success: boolean;
        message: string;
    };
};

const Register = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterValidation>>({
        mode: 'onBlur',
        resolver: zodResolver(RegisterValidation),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            rePassword: '',
            gender: '',
            birthDay: '',
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof RegisterValidation>) => {
        try {
            const { data }: data = await axios.post('auth/register', {
                email: values.email,
                fullName: values.fullName,
                password: values.password,
                gender: values.gender,
                birthDay: values.birthDay,
            });
            if (data.success) {
                router.push('/sign-in');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[380px]">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Email"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Full name"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Re-Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Re-Password"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-around">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value === 'Male'}
                                            onCheckedChange={() => field.onChange('Male')}
                                        />
                                    </FormControl>
                                    <FormLabel>Male</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value === 'Female'}
                                            onCheckedChange={() => field.onChange('Female')}
                                        />
                                    </FormControl>
                                    <FormLabel>Female</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="birthDay"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Birthday</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Birthday"
                                    {...field}
                                    className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 border-input focus:border-black"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Sign Up
                </Button>
            </form>
        </Form>
    );
};

export default Register;
