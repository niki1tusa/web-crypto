import React from 'react';
import styles from './index.module.scss';

interface HighlightTextProps {
  text: string;
  highlight: string;
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  // Если нет текста для подсветки или исходного текста, просто возвращаем исходный текст
  if (!highlight || !text) {
    return <span>{text}</span>;
  }

  // Экранируем специальные символы в строке поиска для использования в регулярном выражении
  const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Создаем регулярное выражение для поиска совпадений, игнорируя регистр
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  
  // Разбиваем текст на части: совпадающие и несовпадающие
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        // Проверяем, совпадает ли часть с искомой строкой (игнорируя регистр)
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return <span key={index} className={styles.highlight}>{part}</span>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
};
