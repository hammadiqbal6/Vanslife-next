"use client";

import { Formik } from "formik";
import * as Yup from "yup";

const TYPES = ["simple", "rugged", "luxury"];

const IMAGE_OPTIONS = [
  { label: "Modest Explorer", value: "/images/vans/modest-explorer.png" },
  { label: "Beach Bum", value: "/images/vans/beach-bum.png" },
  { label: "Reliable Red", value: "/images/vans/reliable-red.png" },
  { label: "Dreamfinder", value: "/images/vans/dreamfinder.png" },
  { label: "The Cruiser", value: "/images/vans/the-cruiser.png" },
  { label: "Green Wonder", value: "/images/vans/green-wonder.png" },
];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  type: Yup.string().oneOf(TYPES).required("Type is required"),
  description: Yup.string()
    .min(20, "Add a bit more detail")
    .required("Description is required"),
  image: Yup.string().required("Image is required"),
});

function VanForm({
  initialValues,
  onSubmit,
  submitLabel = "Save van",
  onCancel,
}) {
  return (
    <Formik
      initialValues={
        initialValues || {
          name: "",
          price: "",
          type: "simple",
          description: "",
          image: IMAGE_OPTIONS[0].value,
        }
      }
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-[#e7d7c5] bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                className="main-input"
                value={values.name}
                onChange={(e) => setFieldValue("name", e.target.value)}
                onBlur={() => setFieldTouched("name")}
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold" htmlFor="price">
                Price / day
              </label>
              <input
                id="price"
                type="number"
                min="1"
                className="main-input"
                value={values.price}
                onChange={(e) => setFieldValue("price", e.target.value)}
                onBlur={() => setFieldTouched("price")}
              />
              {errors.price && touched.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold" htmlFor="type">
                Type
              </label>
              <select
                id="type"
                className="main-input"
                value={values.type}
                onChange={(e) => setFieldValue("type", e.target.value)}
                onBlur={() => setFieldTouched("type")}
              >
                {TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.type && touched.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold" htmlFor="image">
                Image
              </label>
              <select
                id="image"
                className="main-input"
                value={values.image}
                onChange={(e) => setFieldValue("image", e.target.value)}
                onBlur={() => setFieldTouched("image")}
              >
                {IMAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label
              className="block text-sm font-semibold"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="main-input"
              value={values.description}
              onChange={(e) => setFieldValue("description", e.target.value)}
              onBlur={() => setFieldTouched("description")}
            />
            {errors.description && touched.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-amber-550 px-5 py-2.5 font-semibold text-white transition hover:bg-[#e67a28] disabled:opacity-60"
            >
              {isSubmitting ? "Saving…" : submitLabel}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-[#d6c4b0] px-5 py-2.5 font-semibold text-[#161616] transition hover:bg-[#fff1e0]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </Formik>
  );
}

export default VanForm;
