import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../support/firebase";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";

const { height, width } = Dimensions.get('window');

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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.content}>
          <Text style={styles.headerText}>Hey there,</Text>
          <Text style={styles.headerTextBold}>Welcome back</Text>
          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Please enter your email address" }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Email"
                  value={value}
                  style={styles.input}
                />
              )}
            />
            {formState.errors.email && <Text style={styles.errorText}>{formState.errors.email.message}</Text>}
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 6 }}
              render={({ field: { onBlur, onChange, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Password"
                  value={value}
                  style={styles.input}
                  secureTextEntry
                />
              )}
            />
            {formState.errors.password && <Text style={styles.errorText}>{formState.errors.password.message}</Text>}
            <TouchableOpacity style={styles.registerButton} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.registerButtonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Or</Text>
            <View style={styles.socialContainer}>
              {/* Add social login buttons here */}
            </View>
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.linkText} onPress={() => router.navigate("./SignUp")}>Register</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: '100%',
    marginTop: 20, // Added marginTop to move content down
  },
  headerText: {
    fontSize: 18,
    fontWeight: '300',
    marginTop: 20,
  },
  headerTextBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
    width: '100%',
  },
  errorText: {
    color: 'red',
  },
  registerButton: {
    backgroundColor: '#92A3FD',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#92A3FD',
  },
});

export default Login;
