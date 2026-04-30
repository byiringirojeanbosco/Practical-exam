import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";

async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function AccountPage() {
  const navigate = useNavigate();
  const { state, login, signUp, logout, t } = useAppointment();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: state.auth.user?.email || "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  function validate() {
    const nextErrors = {};

    if (mode === "signup" && !form.name.trim()) {
      nextErrors.name = "Required";
    }

    if (!form.email.includes("@")) {
      nextErrors.email = "Use a valid email";
    }

    if (form.password.length < 6) {
      nextErrors.password = "Use at least 6 characters";
    }

    if (
      mode === "login" &&
      state.auth.registeredEmail &&
      form.email.trim().toLowerCase() !== state.auth.registeredEmail.toLowerCase()
    ) {
      nextErrors.email = "Use the email you signed up with";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    const passwordHash = await hashPassword(form.password);

    if (mode === "signup") {
      signUp(
        {
          name: form.name.trim(),
          email: form.email.trim()
        },
        passwordHash
      );
    } else {
      if (state.auth.passwordHash && passwordHash !== state.auth.passwordHash) {
        setErrors({ password: "Password does not match" });
        setIsSubmitting(false);
        return;
      }

      login(form.email.trim());
    }

    navigate("/settings");
  }

  if (state.auth.isAuthenticated) {
    return (
      <div className="space-y-5">
        <section className="space-y-2">
          <Badge tone="green">{t("account.loggedIn")}</Badge>
          <h2 className="text-2xl font-bold text-gray-900">{state.auth.user?.name}</h2>
          <p className="text-sm leading-6 text-gray-600">{state.auth.user?.email}</p>
        </section>

        <Card>
          <p className="text-sm leading-6 text-gray-600">{t("account.localOnly")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Button variant="secondary" onClick={() => navigate("/settings")}>
              {t("app.settings")}
            </Button>
            <Button variant="ghost" onClick={logout}>
              {t("app.logout")}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">{mode === "login" ? t("app.login") : t("app.signup")}</Badge>
        <h2 className="text-2xl font-bold text-gray-900">{t("account.title")}</h2>
        <p className="text-sm leading-6 text-gray-600">{t("account.subtitle")}</p>
      </section>

      <Card as="form" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          {mode === "signup" ? (
            <Input
              id="account-name"
              label={t("account.name")}
              value={form.name}
              required
              error={errors.name}
              onChange={(event) => updateField("name", event.target.value)}
            />
          ) : null}

          <Input
            id="account-email"
            label={t("account.email")}
            type="email"
            value={form.email}
            required
            error={errors.email}
            onChange={(event) => updateField("email", event.target.value)}
          />

          <Input
            id="account-password"
            label={t("account.password")}
            type="password"
            value={form.password}
            required
            error={errors.password}
            onChange={(event) => updateField("password", event.target.value)}
          />
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-500">{t("account.localOnly")}</p>

        <Button className="mt-5" fullWidth type="submit" disabled={isSubmitting}>
          {mode === "login" ? t("account.submitLogin") : t("account.submitSignup")}
        </Button>

        <Button
          className="mt-3"
          fullWidth
          variant="ghost"
          onClick={() => {
            setErrors({});
            setMode(mode === "login" ? "signup" : "login");
          }}
        >
          {mode === "login" ? t("account.switchSignup") : t("account.switchLogin")}
        </Button>
      </Card>
    </div>
  );
}
