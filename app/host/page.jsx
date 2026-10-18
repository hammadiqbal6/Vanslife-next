"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import VanView from "@/components/VanView";
import VanForm from "@/components/VanForm";
import Loader from "@/components/Loader";
import { apiFetch } from "@/utils";

function Host() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;
  const accessToken = session?.user?.token;

  const fetchData = useCallback(async () => {
    if (!userId || !accessToken) return;
    try {
      setError("");
      setLoading(true);
      const result = await apiFetch(`/api/host/${userId}`, {
        token: accessToken,
      });
      setUser(result);
    } catch (err) {
      setError(err.message || "Failed to load host vans");
    } finally {
      setLoading(false);
    }
  }, [userId, accessToken]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, fetchData]);

  const handleCreate = async (values, { setSubmitting, resetForm }) => {
    try {
      await apiFetch("/api/vans", {
        method: "POST",
        token: session.user.token,
        body: JSON.stringify(values),
      });
      resetForm();
      setShowCreate(false);
      await fetchData();
    } catch (err) {
      setError(err.message || "Failed to create van");
    } finally {
      setSubmitting(false);
    }
  };

  if (status === "loading" || loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="wrapper">
        <p className="text-red-600">{error || "Unable to load host dashboard."}</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-[#8a6a4a]">
            Host dashboard
          </p>
          <h1 className="font-display text-3xl font-bold text-[#161616]">
            Welcome back, {user.firstName}
          </h1>
          <p className="mt-1 text-[#4d4d4d]">
            Manage the vans you list for travelers.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate((open) => !open)}
          className="rounded-lg bg-amber-550 px-4 py-2.5 font-semibold text-white transition hover:bg-[#e67a28]"
        >
          {showCreate ? "Close form" : "Add a van"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {showCreate && (
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-bold">List a new van</h2>
          <VanForm
            onSubmit={handleCreate}
            submitLabel="Create van"
            onCancel={() => setShowCreate(false)}
          />
        </div>
      )}

      <h2 className="text-2xl font-bold">Your vans</h2>
      {user.vans?.length ? (
        <VanView
          vans={user.vans}
          basePath="/host/van"
          containerStyles="mt-4 flex flex-col gap-y-4"
          imageStyles="h-28 w-28 rounded-xl object-cover sm:h-36 sm:w-36"
          itemStyles="flex gap-x-4 items-center rounded-2xl border border-[#ead9c8] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          bannerSize={{ width: 144, height: 144 }}
          detailStyles="flex flex-col gap-y-2"
        />
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-[#d6c4b0] bg-white/70 p-8 text-center">
          <p className="font-semibold text-[#161616]">No vans yet</p>
          <p className="mt-1 text-sm text-[#4d4d4d]">
            Add your first listing to start hosting.
          </p>
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="mt-4 rounded-lg bg-amber-550 px-4 py-2 font-semibold text-white"
          >
            Add a van
          </button>
        </div>
      )}

      <p className="mt-8 text-sm text-[#4d4d4d]">
        Looking for inspiration?{" "}
        <Link href="/vans" className="font-semibold text-amber-550 underline">
          Browse the public fleet
        </Link>
      </p>
    </div>
  );
}

export default Host;
