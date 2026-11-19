import { useRef, useState } from "react";

type Screen = "landing" | "register" | "verify" | "otp" | "shop";
type Category = "Semua Produk" | "Pod System" | "Mod & Device" | "Liquid" | "Aksesoris";
type PriceFilter = "all" | "under100" | "100to500" | "over500";

const A = "/assets";

const products = [
  {
    id: 1,
    name: "OXVA Xlim Pro 2 Vape Kit, 1300mAh, 30W",
    category: "Pod System" as Category,
    badge: "Pod",
    seller: "VapeStore Official",
    rating: "4.8",
    reviews: "234",
    price: 125000,
    stock: 1,
    image: `${A}/05e54.png`,
  },
  {
    id: 2,
    name: "lost vape centaurus m200 galaxy black",
    category: "Mod & Device" as Category,
    badge: "Device",
    seller: "Premium Vape",
    rating: "4.6",
    reviews: "156",
    price: 550000,
    stock: 0,
    image: `${A}/06bb0.png`,
  },
  {
    id: 3,
    name: "LQ Freebase Jengyah 60ml 5mg",
    category: "Liquid" as Category,
    badge: "Liquid",
    seller: "Liquid House",
    rating: "4.9",
    reviews: "412",
    price: 155000,
    stock: 0,
    image: `${A}/a91b6.png`,
  },
  {
    id: 4,
    name: "Baterai molicell 18650",
    category: "Aksesoris" as Category,
    badge: "Acc",
    seller: "Premium Vape",
    rating: "4.9",
    reviews: "178",
    price: 75000,
    stock: 0,
    image: `${A}/5129b.png`,
  },
];

const formatPrice = (price: number) => `Rp ${price.toLocaleString("id-ID")}`;

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [notice, setNotice] = useState("");

  const go = (next: Screen) => {
    setScreen(next);
    setNotice("");
    window.scrollTo({ top: 0 });
  };

  return (
    <main>
      {screen === "landing" && <Landing onStart={() => go("register")} onNotice={setNotice} />}
      {screen === "register" && (
        <Register onNext={() => go("verify")} onBack={() => go("landing")} />
      )}
      {screen === "verify" && <Verify onNext={() => go("otp")} onBack={() => go("register")} />}
      {screen === "otp" && <Otp onNext={() => go("shop")} />}
      {screen === "shop" && <Marketplace onLogo={() => go("shop")} onNotice={setNotice} />}
      {notice && (
        <button className="toast" onClick={() => setNotice("")} aria-label="Tutup pemberitahuan">
          {notice}
        </button>
      )}
    </main>
  );
}

function Landing({
  onStart,
  onNotice,
}: {
  onStart: () => void;
  onNotice: (value: string) => void;
}) {
  const benefits = [
    [
      "97f1c.svg",
      "Terverifikasi Aman",
      "Sistem verifikasi umur dengan KTP untuk memastikan pembeli berusia 18+ tahun",
    ],
    [
      "8697f.svg",
      "Produk Original",
      "Hanya menjual produk vape original dari penjual terverifikasi",
    ],
    [
      "c2203.svg",
      "Mudah & Aman",
      "Proses transaksi mudah dengan berbagai metode pembayaran online yang aman",
    ],
  ];

  return (
    <div className="landing">
      <header className="landing-nav">
        <strong className="brand">VAPEPACK</strong>
        <nav>
          <button
            className="text-button"
            onClick={() => onNotice("Halaman masuk tidak termasuk dalam layar yang dipilih.")}
          >
            Masuk
          </button>
          <button className="primary small" onClick={onStart}>
            Daftar
          </button>
        </nav>
      </header>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Marketplace Vape
            <br />
            Terpercaya di Indonesia
          </h1>
          <p>
            Temukan ribuan produk vape original dari penjual terpercaya. Aman, mudah, dan
            terverifikasi.
          </p>
          <div className="hero-actions">
            <button className="primary" onClick={onStart}>
              Mulai Belanja
            </button>
            <button className="secondary" onClick={onStart}>
              Daftar Sebagai Penjual
            </button>
          </div>
        </div>
        <div className="hero-art">
          <img src={`${A}/3ce0b.svg`} alt="" />
        </div>
      </section>
      <section className="benefits">
        <h2>Mengapa VAPEPACK?</h2>
        <div className="benefit-grid">
          {benefits.map(([icon, title, body]) => (
            <article className="benefit-card" key={title}>
              <span className="benefit-icon">
                <img src={`${A}/${icon}`} alt="" />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function Register({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <PageShell size="narrow">
      <form
        className="form-card"
        onSubmit={(event) => {
          event.preventDefault();
          onNext();
        }}
      >
        <div className="card-heading">
          <h1>Daftar Akun Baru</h1>
          <p>Bergabung dengan VAPEPACK</p>
        </div>
        <div className="fields">
          <Field label="Nama Lengkap" placeholder="John Doe" required />
          <Field label="Email" placeholder="email@example.com" type="email" required />
          <Field label="Nomor HP" placeholder="08123456789" type="tel" required />
          <Field label="Password" placeholder="••••••••" type="password" required />
          <Field label="Konfirmasi Password" placeholder="••••••••" type="password" required />
        </div>
        <div className="alert warning">
          <b>!</b>
          <span>
            Dengan mendaftar, Anda menyatakan berusia minimal 18 tahun. Anda akan diminta untuk
            verifikasi umur dengan KTP.
          </span>
        </div>
        <button className="primary full" type="submit">
          Daftar &amp; Lanjut Verifikasi
        </button>
        <p className="card-link">
          Sudah punya akun?{" "}
          <button type="button" onClick={onBack}>
            Masuk di sini
          </button>
        </p>
      </form>
    </PageShell>
  );
}

function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}

function Verify({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const ktpRef = useRef<HTMLInputElement>(null);
  const selfieRef = useRef<HTMLInputElement>(null);
  const [ktp, setKtp] = useState("");
  const [selfie, setSelfie] = useState("");

  const uploader = (
    title: string,
    subtitle: string,
    value: string,
    ref: React.RefObject<HTMLInputElement | null>,
    setValue: (v: string) => void,
  ) => (
    <div className={`upload-box ${value ? "uploaded" : ""}`}>
      <img src={`${A}/55739.svg`} alt="" />
      <h3>{title}</h3>
      <p>{value || subtitle}</p>
      <input
        ref={ref}
        type="file"
        accept="image/jpeg,image/png"
        hidden
        onChange={(e) => setValue(e.target.files?.[0]?.name || "")}
      />
      <button className="secondary compact" type="button" onClick={() => ref.current?.click()}>
        {value ? "Ganti File" : "Pilih File"}
      </button>
    </div>
  );

  return (
    <PageShell size="wide">
      <section className="form-card verify-card">
        <div className="card-heading">
          <h1>Verifikasi Umur</h1>
          <p>Unggah KTP Anda untuk memverifikasi usia minimal 18 tahun</p>
        </div>
        <div className="uploads">
          {uploader("Upload Foto KTP", "Format: JPG, PNG. Maksimal 5MB", ktp, ktpRef, setKtp)}
          {uploader(
            "Upload Selfie dengan KTP",
            "Foto diri Anda memegang KTP",
            selfie,
            selfieRef,
            setSelfie,
          )}
        </div>
        <div className="alert info">
          <b>i</b>
          <span>
            Data KTP Anda akan dienkripsi dan hanya digunakan untuk verifikasi umur. Kami menjaga
            privasi data Anda.
          </span>
        </div>
        <button className="primary full" disabled={!ktp || !selfie} onClick={onNext}>
          Lanjutkan Verifikasi
        </button>
        <button className="back-link" onClick={onBack}>
          ← Kembali
        </button>
      </section>
    </PageShell>
  );
}

function Otp({ onNext }: { onNext: () => void }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const updateDigit = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value.replace(/\D/g, "").slice(-1);
    setDigits(next);
    if (next[index] && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <PageShell size="narrow">
      <section className="form-card otp-card">
        <div className="otp-icon">
          <img src={`${A}/ccfae.svg`} alt="" />
        </div>
        <div className="card-heading">
          <h1>Verifikasi OTP</h1>
          <p>Kode OTP telah dikirim ke email dan nomor HP Anda</p>
        </div>
        <label className="otp-label">Masukkan 6 Digit Kode OTP</label>
        <div className="otp-inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputs.current[index] = node;
              }}
              value={digit}
              inputMode="numeric"
              aria-label={`Digit OTP ${index + 1}`}
              onChange={(e) => updateDigit(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digit && index > 0)
                  inputs.current[index - 1]?.focus();
              }}
            />
          ))}
        </div>
        <p className="resend">
          Tidak menerima kode?{" "}
          <button onClick={() => setDigits(["", "", "", "", "", ""])}>Kirim ulang</button>
        </p>
        <button className="primary full" onClick={onNext}>
          Verifikasi &amp; Lanjutkan
        </button>
      </section>
    </PageShell>
  );
}

function PageShell({ children, size }: { children: React.ReactNode; size: "narrow" | "wide" }) {
  return (
    <div className="page-shell">
      <div className={`shell-card ${size}`}>{children}</div>
    </div>
  );
}

function Marketplace({
  onLogo,
  onNotice,
}: {
  onLogo: () => void;
  onNotice: (value: string) => void;
}) {
  const [category, setCategory] = useState<Category>("Semua Produk");
  const [price, setPrice] = useState<PriceFilter>("all");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>(products.map((p) => p.id));
  const [cart, setCart] = useState<number[]>([]);
  const [detail, setDetail] = useState<(typeof products)[number] | null>(null);

  const shown = products.filter((product) => {
    const categoryMatch = category === "Semua Produk" || product.category === category;
    const priceMatch =
      price === "all" ||
      (price === "under100" && product.price < 100000) ||
      (price === "100to500" && product.price >= 100000 && product.price <= 500000) ||
      (price === "over500" && product.price > 500000);
    return categoryMatch && priceMatch && product.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="marketplace">
      <header className="shop-header">
        <button className="brand" onClick={onLogo}>
          VAPEPACK
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari produk vape..."
          aria-label="Cari produk"
        />
        <div className="header-icons">
          <button onClick={() => onNotice(`${cart.length} produk di keranjang`)}>
            <img src={`${A}/8c467.svg`} alt="Keranjang" />
            {cart.length > 0 && <i>{cart.length}</i>}
          </button>
          <button onClick={() => onNotice(`${favorites.length} produk favorit`)}>
            <img src={`${A}/6595b.svg`} alt="Favorit" />
          </button>
          <button onClick={() => onNotice("Belum ada notifikasi baru.")}>
            <img src={`${A}/66a08.svg`} alt="Notifikasi" />
          </button>
          <button onClick={() => onNotice("Profil pembeli VAPEPACK")}>
            <img src={`${A}/b6ff8.svg`} alt="Profil" />
          </button>
        </div>
      </header>
      <div className="shop-body">
        <section className="promo">
          <h1>Promo Spesial Hari Ini</h1>
          <p>Diskon hingga 30% untuk semua produk liquid!</p>
          <button
            onClick={() => {
              setCategory("Liquid");
              setPrice("all");
            }}
          >
            Lihat Semua Promo
          </button>
        </section>
        <div className="catalog-layout">
          <aside className="filters">
            <h3>Kategori</h3>
            <div className="filter-options">
              {(
                ["Semua Produk", "Pod System", "Mod & Device", "Liquid", "Aksesoris"] as Category[]
              ).map((item) => (
                <button
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
            <hr />
            <h3>Harga</h3>
            <div className="price-options">
              {(
                [
                  ["under100", "Di bawah 100rb"],
                  ["100to500", "100rb - 500rb"],
                  ["over500", "Di atas 500rb"],
                ] as [PriceFilter, string][]
              ).map(([value, label]) => (
                <button
                  className={price === value ? "active" : ""}
                  onClick={() => setPrice(price === value ? "all" : value)}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>
          </aside>
          <section className="products-section">
            <div className="products-title">
              <h2>Produk Pilihan</h2>
              <span>{shown.length} produk</span>
            </div>
            <div className="product-grid">
              {shown.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={() =>
                    setFavorites((current) =>
                      current.includes(product.id)
                        ? current.filter((id) => id !== product.id)
                        : [...current, product.id],
                    )
                  }
                  onCart={() =>
                    setCart((current) =>
                      current.includes(product.id) ? current : [...current, product.id],
                    )
                  }
                  onDetail={() => setDetail(product)}
                />
              ))}
              {!shown.length && (
                <p className="empty-state">Produk tidak ditemukan. Coba filter lainnya.</p>
              )}
            </div>
          </section>
        </div>
      </div>
      {detail && (
        <div className="modal-backdrop" onMouseDown={() => setDetail(null)}>
          <article className="detail-modal" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDetail(null)} aria-label="Tutup">
              ×
            </button>
            <img src={detail.image} alt={detail.name} />
            <div>
              <span className="badge">{detail.badge}</span>
              <h2>{detail.name}</h2>
              <p>{detail.seller}</p>
              <strong>{formatPrice(detail.price)}</strong>
              <button
                className="primary full"
                onClick={() => {
                  setCart((c) => (c.includes(detail.id) ? c : [...c, detail.id]));
                  setDetail(null);
                }}
              >
                Tambah ke Keranjang
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  favorite,
  onFavorite,
  onCart,
  onDetail,
}: {
  product: (typeof products)[number];
  favorite: boolean;
  onFavorite: () => void;
  onCart: () => void;
  onDetail: () => void;
}) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button
          className={`favorite ${favorite ? "selected" : ""}`}
          onClick={onFavorite}
          aria-label="Favorit"
        >
          ♥
        </button>
        <span className="badge">{product.badge}</span>
      </div>
      <h3>{product.name}</h3>
      <p className="seller">{product.seller}</p>
      <p className="rating">
        <span>★</span> {product.rating} <small>({product.reviews})</small>
      </p>
      <div className="price-row">
        <strong>{formatPrice(product.price)}</strong>
        <small>Stok: {product.stock}</small>
      </div>
      <div className="product-actions">
        <button className="primary" onClick={onDetail}>
          Detail
        </button>
        <button className="cart-button" onClick={onCart}>
          <img src={`${A}/34da2.svg`} alt="Tambah ke keranjang" />
        </button>
      </div>
    </article>
  );
}
