import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../support/firebase";
import { Controller, useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { db } from "../support/firebase";
import { addDoc, collection } from "firebase/firestore";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

function SignUp() {
  const [username, setUsername] = useState("");

  const { control, formState, handleSubmit, setError } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          email: user.email,
          username: username,
          swipes: 0,
          createdAt: new Date(),
        });
      }
      // Navigate to another screen or show a success message
    } catch (e) {
      const error = e as AuthError;
      console.log(e);
      // Handle error, e.g., setError for the form
    }
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput
        placeholder="Enter your name"
        value={username}
        onChangeText={setUsername}
      />

      <Text> Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Please enter your school email address" }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your School email."
            value={value}
          />
        )}
      />
      {formState.errors.email && <Text>{formState.errors.email.message}</Text>}

      <Text> Password</Text>
      <Controller
        control={control}
        name="password"
        rules={{ required: true, minLength: 6 }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your password"
            value={value}
          />
        )}
      />
      {formState.errors.password && (
        <Text>{formState.errors.password.message}</Text>
      )}

      <Button title="sign-up" onPress={handleSubmit(onSubmit)} />

      <Text>
        Already have an account?
        <Text onPress={() => router.navigate("./Login")}>Login</Text>
      </Text>
    </View>
  );
}

export default SignUp;
