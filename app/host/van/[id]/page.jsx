"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NavigateBack from "@/components/NavigateBack";
import VanForm from "@/components/VanForm";
import Loader from "@/components/Loader";
import { apiFetch } from "@/utils";

function HostVanDetails({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [van, setVan] = useState(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!session?.user) return;
    try {
      setError("");
      setLoading(true);
      const result = await apiFetch(`/api/host/van/${params.id}`, {
        token: session.user.token,
      });
      setVan(result);
    } catch (err) {
      setError(err.message || "Failed to load van");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status, session?.user?.token, params.id]);

  const handleUpdate = async (values, { setSubmitting }) => {
    try {
      const result = await apiFetch(`/api/vans/${params.id}`, {
        method: "PUT",
        token: session.user.token,
        body: JSON.stringify(values),
      });
      setVan(result.van);
      setEditing(false);
    } catch (err) {
      setError(err.message || "Failed to update van");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this van listing?")) return;
    try {
      await apiFetch(`/api/vans/${params.id}`, {
        method: "DELETE",
        token: session.user.token,
      });
      router.push("/host");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to delete van");
    }
  };

  if (status === "loading" || loading) {
    return <Loader />;
  }

  return (
    <div className="wrapper">
      <NavigateBack message="Back to all vans" href="/host" />
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}
      {van && (
        <div className="mt-4 flex flex-col gap-y-5">
          <div className="overflow-hidden rounded-2xl border border-[#ead9c8] bg-white shadow-sm">
            <Image
              src={van.image}
              alt={van.name}
              width={800}
              height={500}
              priority
              className="max-h-[28rem] w-full object-cover"
            />
            <div className="space-y-3 p-5">
              <i className={`van-type-${van.type}`}>{van.type}</i>
              <h2 className="font-display text-3xl font-bold">{van.name}</h2>
              <p className="text-lg">
                <span className="font-bold">${van.price}</span>/day
              </p>
              <p className="leading-relaxed text-[#4d4d4d]">{van.description}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditing((open) => !open)}
                  className="rounded-lg bg-amber-550 px-4 py-2 font-semibold text-white"
                >
                  {editing ? "Close editor" : "Edit van"}
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-lg border border-red-300 px-4 py-2 font-semibold text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {editing && (
            <div>
              <h3 className="mb-3 text-xl font-bold">Edit listing</h3>
              <VanForm
                initialValues={{
                  name: van.name,
                  price: van.price,
                  type: van.type,
                  description: van.description,
                  image: van.image,
                }}
                onSubmit={handleUpdate}
                submitLabel="Save changes"
                onCancel={() => setEditing(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HostVanDetails;
