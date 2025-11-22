import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { AnimatedText } from '@/components/animated-text';
import { motion } from 'framer-motion';

function LandingContact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSelectChange = useCallback((value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Giả lập delay
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
      alert(t('contact.form.successMessage'));
    },
    [t]
  );

  const contactInfo = [
    {
      icon: Phone,
      title: 'contact.info.phone.title',
      contentKey: 'contact.info.phone.content',
      subContentKey: 'contact.info.phone.subContent',
      href: 'tel:19001234',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: Mail,
      title: 'contact.info.email.title',
      contentKey: 'contact.info.email.content',
      subContentKey: 'contact.info.email.subContent',
      href: 'mailto:support@digitransport.com',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: MapPin,
      title: 'contact.info.address.title',
      contentKey: 'contact.info.address.content',
      subContentKey: 'contact.info.address.subContent',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
    {
      icon: Clock,
      title: 'contact.info.hours.title',
      contentKey: 'contact.info.hours.content',
      subContentKey: 'contact.info.hours.subContent',
      color: 'text-[var(--color-dark-blue)]',
      bg: 'bg-[var(--color-light-blue)]/20',
    },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-32 overflow-hidden" aria-label="Contact">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[var(--color-cream)]/20 -z-20" />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ backgroundColor: 'rgba(143, 171, 212, 0.3)' }}
      />
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-[10%] -left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none"
        style={{ backgroundColor: 'rgba(74, 112, 169, 0.2)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-[var(--color-dark-blue)] tracking-tight">
            <AnimatedText>{t('contact.title')}</AnimatedText>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            <AnimatedText>{t('contact.subtitle')}</AnimatedText>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: CONTACT INFO GRID */}
          <div className="lg:col-span-5 space-y-8">
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* LIQUID GLASS BACKGROUND BLobs */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none -z-10">
                      {/* Blob 1 */}
                      <motion.div
                        className="absolute top-[-20%] left-[-10%] w-[200px] h-[200px] bg-[var(--color-dark-blue)]/15 rounded-full mix-blend-multiply filter blur-[60px]"
                        animate={{
                          x: [0, 30, 0],
                          y: [0, 20, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 6 + index,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.5,
                        }}
                      />
                      {/* Blob 2 */}
                      <motion.div
                        className="absolute bottom-[-20%] right-[-10%] w-[180px] h-[180px] bg-[var(--color-light-blue)]/20 rounded-full mix-blend-multiply filter blur-[60px]"
                        animate={{
                          x: [0, -30, 0],
                          y: [0, -20, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 7 + index,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: index * 0.7,
                        }}
                      />
                    </div>

                    {/* NOISE TEXTURE */}
                    <div className="absolute inset-0 rounded-2xl opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] -z-10" />

                    {/* GLASS CARD */}
                    <Card className="relative border-0 bg-white/40 backdrop-blur-md shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl border-l-4 border-l-transparent hover:border-l-[var(--color-dark-blue)] group overflow-hidden">
                      {/* GLASS OVERLAY */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        initial={false}
                        animate={{
                          backgroundColor: 'rgba(255, 255, 255, 0.3)',
                          backdropFilter: 'blur(8px)',
                        }}
                        whileHover={{
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          backdropFilter: 'blur(12px)',
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      <CardContent className="relative z-10 p-5 flex items-center gap-5">
                        <div
                          className={cn(
                            'w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110',
                            info.bg
                          )}
                        >
                          <Icon className={cn('h-6 w-6', info.color)} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[var(--color-dark-blue)] text-base">
                            <AnimatedText>{t(info.title)}</AnimatedText>
                          </h4>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-gray-600 hover:text-[var(--color-dark-blue)] font-medium transition-colors block mt-0.5"
                            >
                              {t(info.contentKey)}
                            </a>
                          ) : (
                            <p className="text-gray-600 font-medium mt-0.5">
                              {t(info.contentKey)}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">
                            {t(info.subContentKey)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: GLASS FORM */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white/95 backdrop-blur-sm border border-white/50 shadow-2xl rounded-[2rem] overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-bold mb-8 text-[var(--color-dark-blue)]">
                    <AnimatedText>{t('contact.form.title')}</AnimatedText>
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          <AnimatedText>{t('contact.form.name')}</AnimatedText>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:bg-white focus-visible:border-[var(--color-dark-blue)] focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)] focus-visible:ring-offset-2 transition-all"
                          placeholder={t('contact.form.placeholders.name')}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                          <AnimatedText>{t('contact.form.phone')}</AnimatedText>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:bg-white focus-visible:border-[var(--color-dark-blue)] focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)] focus-visible:ring-offset-2 transition-all"
                          placeholder={t('contact.form.placeholders.phone')}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <AnimatedText>{t('contact.form.email')}</AnimatedText>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="h-12 rounded-xl bg-gray-50 border-gray-200 focus-visible:bg-white focus-visible:border-[var(--color-dark-blue)] focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)] focus-visible:ring-offset-2 transition-all"
                        placeholder={t('contact.form.placeholders.email')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <AnimatedText>{t('contact.form.subject')}</AnimatedText>
                      </Label>
                      <Select value={formData.subject} onValueChange={handleSelectChange}>
                        <SelectTrigger id="subject" className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[var(--color-dark-blue)] focus:ring-2 focus:ring-[var(--color-dark-blue)] focus:ring-offset-2 transition-all">
                          <SelectValue placeholder={t('contact.form.selectSubject')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">
                            {t('contact.form.options.booking')}
                          </SelectItem>
                          <SelectItem value="partnership">
                            {t('contact.form.options.partnership')}
                          </SelectItem>
                          <SelectItem value="support">
                            {t('contact.form.options.support')}
                          </SelectItem>
                          <SelectItem value="other">
                            {t('contact.form.options.other')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <AnimatedText>{t('contact.form.message')}</AnimatedText>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="rounded-xl bg-gray-50 border-gray-200 focus-visible:bg-white focus-visible:border-[var(--color-dark-blue)] focus-visible:ring-2 focus-visible:ring-[var(--color-dark-blue)] focus-visible:ring-offset-2 transition-all resize-none"
                        placeholder={t('contact.form.placeholders.message')}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className={cn(
                        'w-full h-12 text-base font-bold rounded-xl shadow-lg transition-all hover:scale-[1.01]',
                        'bg-[var(--color-dark-blue)] hover:bg-[rgba(74,112,169,0.9)] text-white',
                        'shadow-[var(--color-dark-blue)]/20'
                      )}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <AnimatedText>{t('contact.form.sending')}</AnimatedText>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          <AnimatedText>{t('contact.form.submit')}</AnimatedText>
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingContact;
