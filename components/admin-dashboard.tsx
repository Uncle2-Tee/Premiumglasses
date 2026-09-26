'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const categories = ['Windows', 'Doors', 'Commercial', 'Partitions', 'Customised'] as const;
type Category = (typeof categories)[number];
type Gallery = Record<Category, string[]>;

export function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [category, setCategory] = useState<Category>('Windows');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function loadGallery() {
    const response = await fetch('/api/admin/images', { cache: 'no-store' });
    if (response.ok) setGallery(await response.json());
    return response.ok;
  }

  useEffect(() => {
    void loadGallery();
  }, []);

  async function signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');
    const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    setBusy(false);
    if (!response.ok) {
      setMessage('That password was not accepted.');
      return;
    }
    setPassword('');
    setMessage('');
    await loadGallery();
  }

  async function uploadImage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedFile) return;
    setBusy(true);
    setMessage('');
    const formData = new FormData();
    formData.append('category', category);
    formData.append('image', selectedFile);
    const response = await fetch('/api/admin/images', { method: 'POST', body: formData });
    const result = await response.json();
    setBusy(false);
    setMessage(response.ok ? 'Image added to the gallery.' : result.error ?? 'Upload failed.');
    if (response.ok) {
      setSelectedFile(null);
      const input = document.getElementById('gallery-image') as HTMLInputElement | null;
      if (input) input.value = '';
      await loadGallery();
    }
  }

  async function deleteImage(image: string) {
    if (!window.confirm('Delete this image from the gallery?')) return;
    setBusy(true);
    setMessage('');
    const response = await fetch('/api/admin/images', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: image.split('/').pop() }) });
    const result = await response.json();
    setBusy(false);
    setMessage(response.ok ? 'Image deleted.' : result.error ?? 'Delete failed.');
    if (response.ok) await loadGallery();
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setGallery(null);
    setMessage('You have been signed out.');
  }

  if (!gallery) {
    return <section className="admin-login"><p className="eyebrow">PRIVATE ACCESS</p><h1>Gallery admin</h1><p className="lede">Sign in to manage project images.</p><form onSubmit={signIn}><label htmlFor="admin-password">Admin password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required /><button className="button" type="submit" disabled={busy}>{busy ? 'Checking...' : 'Sign in'}</button></form>{message && <p className="admin-message" role="alert">{message}</p>}</section>;
  }

  return <section className="admin-shell"><div className="admin-toolbar"><div><p className="eyebrow">PRIVATE ACCESS</p><h1>Gallery admin</h1><p className="lede">Add new project images or remove an outdated one.</p></div><button className="admin-signout" type="button" onClick={signOut}>Sign out</button></div><form className="admin-upload" onSubmit={uploadImage}><div><label htmlFor="gallery-category">Gallery category</label><select id="gallery-category" value={category} onChange={(event) => setCategory(event.target.value as Category)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></div><div><label htmlFor="gallery-image">Image file</label><input id="gallery-image" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)} required /><small>JPG, PNG, or WebP up to 8MB.</small></div><button className="button" type="submit" disabled={busy || !selectedFile}>{busy ? 'Saving...' : 'Add image'}</button></form>{message && <p className="admin-message" role="status">{message}</p>}<div className="admin-gallery"><section className="admin-category"><div className="admin-category-heading"><h2>{category}</h2><span>{gallery[category].length} images</span></div>{gallery[category].length > 0 ? <div className="admin-image-grid">{gallery[category].map((image) => <article className="admin-image-card" key={image}><Image src={image} alt={`${category} project`} width={240} height={170} /><button type="button" onClick={() => deleteImage(image)} disabled={busy}>Delete</button></article>)}</div> : <p>No images in this category yet.</p>}</section></div></section>;
}
