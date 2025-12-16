const PackagesSection = ({ packages = [] }) => {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-10">
          Our Packages
        </h2>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              {/* Package Name */}
              <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>

              {/* Employee Limit */}
              <p className="text-gray-600 mb-4 text-sm">
                Up to <span className="font-semibold">{pkg.employeeLimit}</span>{" "}
                Employees
              </p>

              {/* Price */}
              <p className="text-3xl font-bold text-indigo-600 mb-5">
                ${pkg.price}
                <span className="text-sm font-medium text-gray-500">
                  /month
                </span>
              </p>

              {/* Features */}
              <ul className="space-y-2 text-sm mb-6">
                {pkg.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2"
                  >
                    <span className="text-indigo-600">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="btn btn-sm w-full bg-indigo-600 text-white hover:bg-indigo-700">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
