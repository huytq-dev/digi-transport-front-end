'use client';

import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AnimatedText } from '@/components/animated-text';
import { POPULAR_ROUTES } from '../constants';

export function PopularRoutes() {
  const { t } = useTranslation();

  return (
    <section className="flex-shrink-0 pb-6">
      <div className="flex justify-between items-end mb-6 px-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-dark-blue)]">
            <AnimatedText>{t('userHome.popularRoutes.title')}</AnimatedText>
          </h2>
          <p className="text-[var(--color-dark-blue)]/70 mt-1 text-xs md:text-sm">
            <AnimatedText>{t('userHome.popularRoutes.subtitle')}</AnimatedText>
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Button variant="ghost" className="text-[var(--color-dark-blue)] hover:bg-[var(--color-light-blue)]/10 group">
            <AnimatedText>{t('userHome.popularRoutes.viewAll')}</AnimatedText> 
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {POPULAR_ROUTES.map((item, index) => (
          <motion.div 
            key={`${item.from}-${item.to}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1, 
              type: "spring", 
              stiffness: 50 
            }}
            whileHover={{ 
              y: -8, 
              transition: { type: "spring", stiffness: 300 } 
            }}
            className={cn(
              "group relative rounded-2xl overflow-hidden cursor-pointer",
              "bg-white shadow-md border border-gray-100",
              "hover:shadow-2xl hover:border-[var(--color-light-blue)]/30"
            )}
          >
            <div className="aspect-[4/3] overflow-hidden relative">
              <img 
                src={item.img} 
                alt={`${item.from} to ${item.to}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-105" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className={cn(
                "absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md",
                "bg-white/90 text-[var(--color-dark-blue)]",
                "group-hover:scale-105 transition-transform"
              )}>
                Từ {item.price}
              </div>
            </div>
            
            <div className="p-4 bg-white relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-[var(--color-dark-blue)] text-sm md:text-base">{item.from}</span>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="font-bold text-[var(--color-dark-blue)] text-sm md:text-base">{item.to}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <User className="w-3 h-3" /> 
                  <span>25+ <AnimatedText>{t('userHome.popularRoutes.driversAvailable')}</AnimatedText></span>
                </div>
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  className="text-[var(--color-dark-blue)] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

