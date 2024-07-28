import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../support/firebase";
import { Controller, useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

interface FormValues {
  email: string;
  password: string;
}

const defaultValues: FormValues = {
  email: "",
  password: "",
};

function Login() {
  const [firstName, setFirstname] = useState<string | null>(null);

  const { control, formState, handleSubmit, setError } = useForm<FormValues>({
    defaultValues,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      if (user) {
        // Fetching the user's document from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstname(userData?.firstName || "User");
          // Navigate to home page or display the username
          console.log("Firstname: ", userData?.firstName);
          router.push("./Home");
        } else {
          console.log("No such document!");
        }
      }
    } catch (e) {
      const error = e as AuthError;
      console.log(e);
      // Handle error, e.g., setError for the form
    }
  };

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>Hey there, Welcome back</Text>

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: "Please enter your email address" }}
        render={({ field: { onBlur, onChange, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder="Enter your email."
            value={value}
          />
        )}
      />
      {formState.errors.email && <Text>{formState.errors.email.message}</Text>}

      <Text>Password</Text>
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
            secureTextEntry
          />
        )}
      />
      {formState.errors.password && (
        <Text>{formState.errors.password.message}</Text>
      )}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      <Text>
        Don't have an account?
        <Text onPress={() => router.navigate("./SignUp")}>Register</Text>
      </Text>
    </View>
  );
}

export default Login;
