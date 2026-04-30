import { useNavigate } from "react-router-dom";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import Card from "../../components/ui/Card.jsx";
import Icon from "../../components/ui/Icon.jsx";
import { useAppointment } from "../../context/AppointmentContext.jsx";
import { colorThemes, languageOptions } from "../../utils/preferences.js";

export default function SettingsPage() {
  const navigate = useNavigate();
  const { state, progress, setTheme, setLanguage, t } = useAppointment();

  return (
    <div className="space-y-5">
      <section className="space-y-2">
        <Badge tone="blue">{t("app.settings")}</Badge>
        <h2 className="text-2xl font-bold text-gray-900">{t("settings.title")}</h2>
        <p className="text-sm leading-6 text-gray-600">{t("settings.subtitle")}</p>
      </section>

      <Card>
        <h3 className="text-base font-bold text-gray-900">{t("settings.theme")}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {colorThemes.map((theme) => {
            const isSelected = state.preferences.theme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setTheme(theme.id)}
                className={[
                  "focus-ring subtle-transition flex min-h-16 items-center gap-3 rounded-lg border bg-white p-3 text-left",
                  isSelected ? "border-[var(--color-primary)]" : "border-gray-200 hover:bg-gray-50"
                ].join(" ")}
              >
                <span
                  className="h-9 w-9 rounded-full border border-gray-200"
                  style={{ backgroundColor: theme.hex }}
                />
                <span>
                  <span className="block text-sm font-bold text-gray-900">{theme.name}</span>
                  <span className="block text-sm text-gray-500">{theme.hex}</span>
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <h3 className="text-base font-bold text-gray-900">{t("settings.language")}</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {languageOptions.map((language) => {
            const isSelected = state.preferences.language === language.id;

            return (
              <button
                key={language.id}
                type="button"
                onClick={() => setLanguage(language.id)}
                className={[
                  "focus-ring subtle-transition min-h-12 rounded-lg border px-3 text-left text-sm font-bold",
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                ].join(" ")}
              >
                {language.label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">{t("settings.progressTitle")}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {t("app.progress", { percent: progress.percent })}
            </p>
          </div>
          <Badge tone="blue">
            {progress.completed}/{progress.total}
          </Badge>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-[var(--color-primary)]"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary-text)]">
            <Icon name="user" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900">{t("settings.accountTitle")}</h3>
            <p className="mt-1 text-sm leading-6 text-gray-500">{t("settings.accountText")}</p>
          </div>
        </div>
        <Button className="mt-4" fullWidth onClick={() => navigate("/account")}>
          {state.auth.isAuthenticated ? t("app.account") : t("app.login")}
        </Button>
      </Card>
    </div>
  );
}
